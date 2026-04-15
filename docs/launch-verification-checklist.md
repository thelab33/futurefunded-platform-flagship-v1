# FutureFunded — Launch Verification Checklist

## Recovery point locked in
- [x] `vite.config.js` cleaned and de-duplicated
- [x] `server.allowedHosts` includes `getfuturefunded.com`
- [x] local Vite app runs on `127.0.0.1:5173`
- [x] Cloudflare tunnel points to `http://127.0.0.1:5173`
- [x] public root responds and redirects to `/platform`
- [x] public campaign page responds successfully

## Public/live checks
- [ ] `curl -I https://getfuturefunded.com` returns `307` to `/platform`
- [ ] `curl -I https://getfuturefunded.com/c/connect-atx-elite` returns `200`
- [ ] homepage loads in browser without blocked-host errors
- [ ] campaign page loads in browser on public domain
- [ ] no unexpected 403/502 responses on public routes
- [ ] favicon added so `/favicon.ico` no longer 404s

## Platform checks
- [ ] `/platform` looks correct on desktop
- [ ] `/platform` looks correct on mobile
- [ ] `/platform/onboarding` loads and reads clean
- [ ] `/platform/dashboard` loads and reads clean
- [ ] `/platform/pricing` loads
- [ ] `/platform/demo` loads

## Campaign checks
- [ ] `/c/connect-atx-elite` hero renders correctly
- [ ] donate CTA opens the correct flow
- [ ] sponsor CTA opens the correct flow
- [ ] share action works
- [ ] theme toggle works
- [ ] no broken console errors
- [ ] no missing styles or malformed layout blocks

## Money-path checks
- [ ] test donation flow reaches Stripe successfully
- [ ] success return state renders correctly
- [ ] cancel return state renders correctly
- [ ] sponsor checkout flow opens and redirects correctly
- [ ] sponsor success state hydrates with real persisted data
- [ ] sponsor wall updates correctly after successful sponsor purchase
- [ ] webhook path behaves correctly in test mode
- [ ] no dev/debug sponsor junk remains in production-facing data

## Cloudflare / deployment checks
- [ ] tunnel stays stable while local app is running
- [ ] native Workers deploy authenticated successfully
- [ ] `wrangler deploy` completes successfully
- [ ] production no longer depends on local machine + tunnel
- [ ] required Cloudflare env vars/secrets are configured
- [ ] public DNS/routes point to the intended production lane

## Pre-demo checklist
- [ ] clean browser session
- [ ] test card ready
- [ ] one sponsor test tier ready
- [ ] one polished org story loaded
- [ ] one believable fundraising goal loaded
- [ ] one clean sponsor wall visible
- [ ] no terminal errors visible during demo

## Commit note
This checkpoint captures:
- tunnel recovery
- Vite allowed host fix
- Cloudflare Workers prep
- launch verification checklist
