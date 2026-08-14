const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/+$/, "");

function assetPath(path: string) {
  return `${basePath}${path}`;
}

export const mobileAssets = {
  iphoneBezel: assetPath("/assets/iphone/Bezel.png"),
  iphoneKeyboard: assetPath("/assets/iphone/Keyboard.png"),
  androidKeyboard: assetPath("/assets/android/Keyboard.png"),
  pixel10Bezel: assetPath("/assets/android/Pixel10.png"),
  androidNavigationBar: assetPath("/assets/android/navigation-bar.svg"),
  androidStatusIcons: assetPath("/assets/status/status-icons.svg"),
  iosStatusIcons: assetPath("/assets/status/ios-status-icons.svg"),
} as const;
