# JioHotstar Desktop (Unofficial)

A lightweight Electron desktop wrapper that opens the official JioHotstar website in its own window. This is an **unofficial community project** and is not affiliated with, endorsed by, or maintained by JioHotstar.
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/71ba3895-fd49-49fb-bac5-da29d84a41f1" />

## Supported packages

- **Windows:** installer `.exe`
- **Linux:** Debian package `.deb` for x86-64 (amd64) Debian-based distributions, such as Ubuntu, Debian, Linux Mint, and Pop!_OS.

## Download builds

Open the repository's **Actions** tab and select a successful **Build desktop packages** run. Download the Linux or Windows artifact at the bottom of the run page. Artifacts are zipped by GitHub; extract the downloaded artifact to get the package.

When a versioned GitHub Release is published, installers will also be attached to the release assets.

## Install on Linux

1. Download and extract the `.deb` artifact.
2. Open the `.deb` file in your system's software installer.
3. Choose **Install** and then launch **JioHotstar Desktop (Unofficial)** from your applications menu.

The Linux package is intended for **amd64/x86-64** only. It is not an RPM, AppImage, or ARM build.

## Build locally

Install Node.js (22 or newer), then in the repository directory run:

```sh
npm install
npm start
```

To build the Linux Debian package:

```sh
npm run dist:linux
```

To build the Windows installer:

```sh
npm run dist:windows
```

Build output is written to `dist/`.

## Important notes

- The app displays the official JioHotstar website; it does not bypass subscriptions, geographic restrictions, DRM, or account requirements.
- A working internet connection and any required JioHotstar account or subscription are still needed.
- Website sign-in, playback, DRM, or platform policies can change independently of this wrapper.
- JioHotstar and its logos/trademarks belong to their respective owners.

## Search tags

If you're looking for a desktop app or website wrapper for JioHotstar, try these keywords:

`#JioHotstar` `#JioHotstarDesktop` `#Hotstar` `#Electron` `#ElectronApp` `#DesktopApp` `#Windows` `#Linux` `#Debian` `#Ubuntu` `#Streaming` `#OpenSource` `#Unofficial`

**Search keywords:** JioHotstar desktop app, Hotstar for Windows, JioHotstar Linux, JioHotstar Debian package, Hotstar Electron wrapper, streaming desktop app.
