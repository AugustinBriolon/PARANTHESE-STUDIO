export type OS = 'ios' | 'android' | 'windows' | 'macos';

export interface OSInfo {
  os: OS | null;
  version: number | null;
}

export const getOSInfo = (): OSInfo => {
  if (typeof window === 'undefined') {
    return { os: null, version: null };
  }

  const userAgent = navigator.userAgent || navigator.vendor || '';
  const platform = navigator.platform || '';

  // Détection iOS (en premier pour éviter les conflits avec macOS)
  const isIOSDevice =
    /iPad|iPhone|iPod/.test(userAgent) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOSDevice) {
    const match = userAgent.match(/OS (\d+)[._](\d+)/);
    if (match) {
      return {
        os: 'ios',
        version: parseFloat(`${match[1]}.${match[2]}`),
      };
    }
    return { os: 'ios', version: null };
  }

  // Détection Android
  const isAndroidDevice = /Android/.test(userAgent);
  if (isAndroidDevice) {
    const match = userAgent.match(/Android (\d+)(?:\.(\d+))?/);
    if (match) {
      return {
        os: 'android',
        version: parseFloat(`${match[1]}.${match[2] || 0}`),
      };
    }
    return { os: 'android', version: null };
  }

  // Détection Windows
  const isWindowsDevice = /Windows/.test(userAgent) || /Win/.test(platform);
  if (isWindowsDevice) {
    // Windows 10/11: "Windows NT 10.0"
    // Windows 8.1: "Windows NT 6.3"
    // Windows 8: "Windows NT 6.2"
    // Windows 7: "Windows NT 6.1"
    const match = userAgent.match(/Windows NT (\d+)\.(\d+)/);
    if (match) {
      const major = parseInt(match[1], 10);
      const minor = parseInt(match[2], 10);
      // Convertir en version Windows
      // NT 10.0 = Windows 10/11
      // NT 6.3 = Windows 8.1
      // NT 6.2 = Windows 8
      // NT 6.1 = Windows 7
      if (major === 10) {
        return { os: 'windows', version: 10 };
      }
      if (major === 6) {
        if (minor === 3) return { os: 'windows', version: 8.1 };
        if (minor === 2) return { os: 'windows', version: 8 };
        if (minor === 1) return { os: 'windows', version: 7 };
      }
      return { os: 'windows', version: major + minor / 10 };
    }
    return { os: 'windows', version: null };
  }

  // Détection macOS (après iOS pour éviter les iPads)
  const isIPad =
    /iPad/.test(userAgent) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (!isIPad) {
    const isMacDevice =
      /Macintosh|Mac OS X/.test(userAgent) ||
      platform === 'MacIntel' ||
      platform === 'MacPPC' ||
      platform === 'Mac68K';

    if (isMacDevice) {
      // Pour macOS 11+, la userAgent peut toujours afficher "Mac OS X 10.15" pour compatibilité
      // On utilise navigator.userAgentData si disponible (Chrome/Edge) pour la vraie version
      if (typeof navigator !== 'undefined' && 'userAgentData' in navigator) {
        const { userAgentData } = navigator as {
          userAgentData?: { platformVersion?: string };
        };
        const { platformVersion } = userAgentData || {};
        if (platformVersion) {
          const versionMatch = platformVersion.match(/^(\d+)\.(\d+)/);
          if (versionMatch) {
            const major = parseInt(versionMatch[1], 10);
            // macOS 11+ commence à partir de la version 11
            if (major >= 11) {
              return { os: 'macos', version: major };
            }
            // Si major < 11, on retourne la version détectée
            return { os: 'macos', version: major };
          }
        }
      }

      // Pour Safari, la userAgent affiche toujours "Mac OS X 10.15" même pour macOS 26
      // On ne peut pas détecter la vraie version, donc on retourne null
      // Cela empêchera de forcer LOW sur les versions récentes
      // Si on a vraiment besoin de détecter, on pourrait utiliser des heuristiques
      // mais pour l'instant, on assume que c'est une version récente si non détectable
      return { os: 'macos', version: null };
    }
  }

  return { os: null, version: null };
};
