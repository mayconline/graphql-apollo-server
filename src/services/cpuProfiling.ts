import { Session } from 'node:inspector/promises';
import { writeFileSync } from 'node:fs';
import { join } from 'path';

function cpuProfiling() {
  let _session: Session;

  return {
    async start() {
      _session = new Session();
      _session.connect();

      await _session.post('Profiler.enable');
      await _session.post('Profiler.start');

      console.log('Profiling started');
    },

    async stop() {
      console.log('Profiling stopped');

      const { profile } = await _session.post('Profiler.stop');
      if (!profile) return;

      const profileName = join(
        process.cwd(),
        `cpu-profile-${Date.now()}.cpuprofile`,
      );
      const profileString = JSON.stringify(profile);

      try {
        writeFileSync(profileName, profileString);
      } catch (error) {
        console.error('Error writing profile file:', error);
      }

      _session.disconnect();
    },
  };
}

const { start: startCpuProfiling, stop } = cpuProfiling();

function stopCpuProfiling() {
  const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  exitSignals.forEach(signal => {
    process.once(signal, async () => {
      await stop();
      setTimeout(() => process.exit(0), 100);
    });
  });
}

export { startCpuProfiling, stopCpuProfiling };

// open *.cpuprofile with https://discoveryjs.github.io/cpupro/
