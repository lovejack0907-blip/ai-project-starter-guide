// Keep telemetry disabled without writing a global setting outside this project.
process.env.ASTRO_TELEMETRY_DISABLED = '1';
await import('../node_modules/astro/astro.js');
