It is not forced. We chose Cloudflare Access because it is the safer public self-host option, but you can bypass it.

Your options:

No login at all
Set OpenSEO to local trusted mode:
AUTH_MODE=local_noauth
Then remove/disable the Cloudflare Access app for seo.affinitydesign.ca, or create an Access Bypass policy. This makes OpenSEO auto-use a local admin user.

Important: if seo.affinitydesign.ca is public, this means anyone who can reach the URL can use the app. I would only do this if you also protect it some other way, like IP allowlisting, private VPN, or Cloudflare Zero Trust network rules.

Bypass only your IP
Keep it private-ish by adding an Access policy:
Action: Bypass
Include: IP ranges
your.current.public.ip/32
Then set:

AUTH_MODE=local_noauth
This skips email login only from your IP.

Use OpenSEO’s own login instead
Switch to:
AUTH_MODE=hosted
BETTER_AUTH_URL=https://seo.affinitydesign.ca
BETTER_AUTH_SECRET=<32+ char random secret>
This uses the app’s built-in email/password auth instead of Cloudflare Access, but it may need email verification config or a temporary verification bypass.

So no, it is not forced. Fastest practical path is either IP-bypass + local_noauth or hosted auth. For a public URL, I would avoid global local_noauth unless you intentionally want it open.
