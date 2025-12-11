import config from '../config/environment';

const TIMEOUT = 4000;

function timeoutPromise(ms: number, p: Promise<Response>) {
  return new Promise<Response>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    p.then((res) => {
      clearTimeout(t);
      resolve(res);
    }).catch((err) => {
      clearTimeout(t);
      reject(err);
    });
  });
}

export async function isBackendAvailable() {
  try {
    const base = config.api.baseUrl;
    const r = await timeoutPromise(TIMEOUT, fetch(`${base}/v1/health`));
    return r.ok;
  } catch (e) {
    return false;
  }
}

export async function safeFetch(path: string, opts?: RequestInit) {
  const base = config.api.baseUrl;
  const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`;
  try {
    const r = await timeoutPromise(TIMEOUT, fetch(url, opts));
    const text = await r.text();
    return { ok: r.ok, status: r.status, text };
  } catch (e: any) {
    // fallback mock
    return { ok: false, status: 0, text: `offline: ${e?.message || e}` };
  }
}

export default { isBackendAvailable, safeFetch };
