# The Pesto Tauri App



#### About icons

```bash
pnpm tauri icon --help

cat <<EOF >./tauri.conf.json
{
  "tauri": {
    "bundle": {
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ]
    }
  }
}
EOF

pnpm tauri icon ./src-tauri/assets/pesto.jpg

```

* and icons are generated :

```bash
$ pnpm tauri icon ./src-tauri/assets/pesto_sqr.jpg
        Appx Creating StoreLogo.png
        Appx Creating Square30x30Logo.png
        Appx Creating Square44x44Logo.png
        Appx Creating Square71x71Logo.png
        Appx Creating Square89x89Logo.png
        Appx Creating Square107x107Logo.png
        Appx Creating Square142x142Logo.png
        Appx Creating Square150x150Logo.png
        Appx Creating Square284x284Logo.png
        Appx Creating Square310x310Logo.png
        ICNS Creating icon.icns
         ICO Creating icon.ico
         PNG Creating 128x128@2x.png
         PNG Creating icon.png
         PNG Creating 32x32.png
         PNG Creating 128x128.png

$ pnpm run icons

> vite-tauri@0.0.0 icons C:\jbl_vbox\install\react-ts-tauri\vite-tauri
> bash -c 'pnpm tauri icon ./src-tauri/assets/pesto_sqr.jpg'

        Appx Creating StoreLogo.png
        Appx Creating Square30x30Logo.png
        Appx Creating Square44x44Logo.png
        Appx Creating Square71x71Logo.png
        Appx Creating Square89x89Logo.png
        Appx Creating Square107x107Logo.png
        Appx Creating Square142x142Logo.png
        Appx Creating Square150x150Logo.png
        Appx Creating Square284x284Logo.png
        Appx Creating Square310x310Logo.png
        ICNS Creating icon.icns
         ICO Creating icon.ico
         PNG Creating 128x128@2x.png
         PNG Creating icon.png
         PNG Creating 32x32.png
         PNG Creating 128x128.png

```

src\assets\layout\cosmic_coctails_3.jpeg

```bash
$ pnpm tauri icon --help
Generates various icons for all major platforms

Usage: node node_modules\@tauri-apps\cli\tauri.js icon [OPTIONS] [INPUT]

Arguments:
  [INPUT]  Path to the source icon (png, 1024x1024px with transparency) [default: ./app-icon.png]

Options:
  -o, --output <OUTPUT>  Output directory. Default: 'icons' directory next to the tauri.conf.json file
  -v, --verbose...       Enables verbose logging
  -p, --png <PNG>        Custom PNG icon sizes to generate. When set, the default icons are not generated
  -h, --help             Print help
  -V, --version          Print version

```

## About 
## ANNEX: How I spinned it up


```bash
  490  pnpm create vite@latest --template react-ts --manager pnpm
  491  cd vite-tauri/
  492  pnpm add -D @tauri-apps/cli && pnpm tauri init && pnpm i && pnpm tauri dev
  495  pnpm tauri init --ci
  496  pnpm i && pnpm tauri dev
  576  pnpm i
  577  code .
  578  pnpm tauri dev


```

#### Flowbite React setup

_Following instructions at https://www.flowbite-react.com/docs/getting-started/introduction_

* Add dependencies :

```bash
pnpm add -D autoprefixer postcss tailwindcss
pnpm exec tailwindcss init -p
```

* Do this :


## ANNEX Refs

* https://tauri.app/v1/guides/features/icons/#command-usage
* https://www.flowbite-react.com/docs/getting-started/introduction