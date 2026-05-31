import { NextResponse } from 'next/server'

export async function POST() {
    // Clear the token from localStorage
    if (typeof window !== 'undefined') {
        localStorage.removeItem('documind_token')
    }
    return NextResponse.json({ message: 'Logout successful' })
}
