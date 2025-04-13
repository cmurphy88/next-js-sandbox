// middleware.js (in ROOT folder)
import { NextResponse } from 'next/server'
import { decrypt } from '@/lib/session' // Ensure path is correct from root
import { cookies } from 'next/headers'

// --- Configuration ---
// '/' is PUBLIC (Landing Page)
const protectedBasePaths = ['/todos', '/health', '/finances'] // Sections requiring login
const publicPaths = ['/login', '/signup', '/'] // Always public paths
const dashboardPath = '/dashboard' // Or '/todos' - where logged-in users land first
const loginPath = '/login'

// --- Middleware Logic ---
export default async function middleware(req) {
  const path = req.nextUrl.pathname
  const start = Date.now()

  console.log(`\n--- Middleware Start ---`)
  console.log(`Path: ${path}`)

  // 1. Get Cookie Store (Explicit await)
  let cookieValue = undefined
  try {
    // ****** FIX for await error ******
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    cookieValue = sessionCookie?.value
    console.log(
      `Cookie 'session' found: ${sessionCookie ? 'Yes' : 'No'}, Value: ${
        cookieValue ? '[PRESENT]' : '[EMPTY/MISSING]'
      }`
    )
  } catch (error) {
    // This catch is mainly for potential errors *within* cookies() itself, though unlikely
    console.error('Middleware: Error accessing cookie store:', error)
  }

  // 2. Attempt Decryption and Check Session Structure
  let session = null
  let decryptedSessionObject = null
  if (cookieValue) {
    try {
      decryptedSessionObject = await decrypt(cookieValue)
      // ****** CRITICAL DEBUG LOG ******
      console.log(
        `Decrypted Session Object RAW:`,
        JSON.stringify(decryptedSessionObject)
      )
      // ****** END CRITICAL DEBUG LOG ******
      session = decryptedSessionObject // Assign if decryption successful
    } catch (error) {
      console.error('Middleware: Session decryption error:', error.message)
      // If decryption fails, the cookie might be invalid/stale
      // Optionally delete the invalid cookie:
      // const response = NextResponse.next();
      // response.cookies.delete('session');
      // return response; // Or continue treating as logged out
      session = null
    }
  } else {
    console.log('Middleware: No session cookie value found.')
  }

  // 3. Determine Login Status (Check your actual session object structure!)
  //    ****** !! VERY IMPORTANT: Is 'id' the correct property name in your session object? !! ******
  //    Check the "Decrypted Session Object RAW" log above. It might be 'id', 'user_id', etc.
  const isLoggedIn = !!session?.userId
  console.log(
    `Session Object Valid and has 'id'?: ${
      session ? session.hasOwnProperty('userId') : 'N/A (No Session)'
    }`
  )
  console.log(`Final 'isLoggedIn' Check: ${isLoggedIn}`)

  // --- Determine Route Type ---
  const isAccessingProtectedRoute = protectedBasePaths.some((basePath) =>
    path.startsWith(basePath)
  )
  const isAccessingPublicPath = publicPaths.includes(path)
  console.log(
    `Route Checks: isProtected=${isAccessingProtectedRoute}, isPublic=${isAccessingPublicPath}`
  )

  // --- Decision Logic ---
  let decision = 'Allow'

  // CASE 1: Trying PROTECTED route, NOT logged in
  if (isAccessingProtectedRoute && !isLoggedIn) {
    decision = `Redirect to ${loginPath} (Reason: Protected, not logged in)`
    const redirectUrl = new URL(loginPath, req.nextUrl)
    redirectUrl.searchParams.set('callbackUrl', path)
    console.log(`Decision: ${decision}`)
    console.log(`--- Middleware End (${Date.now() - start}ms) ---\n`)
    return NextResponse.redirect(redirectUrl)
  }

  // CASE 2: Trying PUBLIC route, IS logged in
  if (isAccessingPublicPath && isLoggedIn) {
    if (path === dashboardPath) {
      decision = `Allow (Reason: Already at dashboard ${dashboardPath})`
    } else {
      decision = `Redirect to ${dashboardPath} (Reason: Public, logged in)`
      console.log(`Decision: ${decision}`)
      console.log(`--- Middleware End (${Date.now() - start}ms) ---\n`)
      return NextResponse.redirect(new URL(dashboardPath, req.nextUrl))
    }
  }

  // CASE 3: Allow
  console.log(`Decision: ${decision}`)
  console.log(`--- Middleware End (${Date.now() - start}ms) ---\n`)
  return NextResponse.next()
}

// Matcher
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)',
  ],
}
