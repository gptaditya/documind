'use client';
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import FeaturesSection from '@/components/home/FeaturesSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import CtaSection from '@/components/home/CtaSection'
import LandingFooter from '@/components/home/LandingFooter'
import { useEffect } from 'react'

export default function LandingPage() {
  //is logged in render to dashboard
  useEffect(()=>{
    const token = localStorage.getItem('documind_token')
    if(token){
      //redirect to dashboard
      window.location.href = '/dashboard'
    }
  }, [])
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
      <LandingFooter />
    </div>
  )
}
