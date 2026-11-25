import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';
export const dynamic = 'force-dynamic';
type LiveData = {code:string;recording:boolean;heartRate:number|null;sdnn:number|null;quality:string|null;qualityConfidence:number|null;updatedAt:Date};
const local = process.env.NODE_ENV === 'development';
const state = globalThis as typeof globalThis & {onbitLive?: Map<string,LiveData>};
const live = state.onbitLive ??= new Map<string,LiveData>();
const headers = { 'Cache-Control': 'no-store' };
export async function POST(request: Request) {
 try {
 const body = await request.json();
 if (!/^\d{4}$/.test(body.code) || typeof body.recording !== 'boolean') return NextResponse.json({error:'Invalid session'}, {status:400});
 const nullable = (x: unknown) => typeof x === 'number' && Number.isFinite(x) && x >= 0 ? x : null;
 const data = {code:body.code,recording:body.recording,heartRate:nullable(body.heartRate),sdnn:nullable(body.sdnn),quality:['bad','acceptable','excellent'].includes(body.quality)?body.quality:null,qualityConfidence:nullable(body.qualityConfidence),updatedAt:new Date()};
 if (local) {
   const now=Date.now();
   for(const [key,value] of live) if(now-value.updatedAt.getTime()>60000) live.delete(key);
   live.set(body.code,data);
   return NextResponse.json({success:true},{headers});
 }
 await dbConnect();
 await mongoose.connection.collection('live_measurements').updateOne({_id:body.code},{$set:data},{upsert:true});
 return NextResponse.json({success:true},{headers});
 }catch{return NextResponse.json({error:'Live relay unavailable'},{status:503,headers});}
}
export async function GET(request: Request) {
 const code=new URL(request.url).searchParams.get('code') || '';
 if (!/^\d{4}$/.test(code)) return NextResponse.json({error:'Invalid code'},{status:400,headers});
 if(local) return NextResponse.json({data:live.get(code) ?? null},{headers});
 try {await dbConnect();const data=await mongoose.connection.collection('live_measurements').findOne({_id:code as any},{projection:{_id:0}});return NextResponse.json({data},{headers});}
 catch{return NextResponse.json({error:'Live relay unavailable'},{status:503,headers});}
}
