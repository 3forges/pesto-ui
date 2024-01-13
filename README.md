# The Pesto UI

## Start Locally

To start the Pesto UI, you need to first start the Pesto API. To start the Pesto API, refer to [the Pesto API repository](https://github.com/3forges/pesto-api).

## Run the `Pesto API` locally

### The infrastructure

To run `Pesto API`, with the `Pesto UI`, Locally, you need:

* One Hardware Machine, basically your everyday dev machine, on which you will run both `Pesto UI` and `Pesto API`. The `Pesto API` uses a `MongoDB` database, which will run on a different machine than the `Pesto API`, a VirtualBox VM.
* One VirtualBox VM on which you will run the `MongoDB`, database of the `Pesto API`.
* To configure 3 DNS names: one DNS name for `Pesto API`, one DNS name for `Pesto UI`, and one DNS name for the `MongoDB` database service.

#### Configuring DNS names

* On the Hardware Machine where you run both  `Pesto API` and  `Pesto API`, if it is Windows, in git bash:

```bash

# --- 
# IP address of the VM on which the Mongo DB runs
export IPADDR_OF_YOUR_VM="192.168.37.202"
# --- 
# IP address of the Machine on which the UI and API run
export IPADDR_OF_YOUR_HWMACHINE="192.168.37.236"
# ---
# Add the host for the machine hosting your MongoDB
export PESTO_MONGO_HOST=mongo.pesto.io
echo "# ---- " | tee -a /c/Windows/System32/drivers/etc/hosts
echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | tee -a /c/Windows/System32/drivers/etc/hosts
export PESTO_UI_FQDN=ui.pesto.io
echo "# ---- " | tee -a /c/Windows/System32/drivers/etc/hosts
echo "${IPADDR_OF_YOUR_HWMACHINE}      ${PESTO_UI_FQDN}" | tee -a /c/Windows/System32/drivers/etc/hosts
export PESTO_API_FQDN=api.pesto.io
echo "# ---- " | tee -a /c/Windows/System32/drivers/etc/hosts
echo "${IPADDR_OF_YOUR_HWMACHINE}      ${PESTO_API_FQDN}" | tee -a /c/Windows/System32/drivers/etc/hosts
# ---
# if you're dhcp, you will need to update the IP Addresses everytime the DHCP server updates the IP Addresses of the machines you run Pesto API and Pesto UI on:  


# --- # --- # --- # --- # --- # --- # --- # --- # --- #
# -- UPDATING IP ADDRESS OF THE VM WHERE MONGO DB RUNS
# --- # --- # --- # --- 
# -- 
export OLD_IPADDR_OF_YOUR_VM="192.168.174.202"
export IPADDR_OF_YOUR_VM="192.168.37.202"
sed -i "s#${OLD_IPADDR_OF_YOUR_VM}#${IPADDR_OF_YOUR_VM}#g" /c/Windows/System32/drivers/etc/hosts

# --- # --- # --- # --- # --- # --- # --- # --- # --- #
# -- UPDATING IP ADDRESS OF THE HARDWARE MACHINE 
# --- # --- # --- # --- 
# - WHERE I HAVE MY [VSCODE] and I 
# - run locally the code in dev mode : 
# - Pesto API and the frontend
export OLD_IPADDR_OF_YOUR_HWMACHINE="192.168.225.236"
export IPADDR_OF_YOUR_HWMACHINE="192.168.37.236"
sed -i "s#${OLD_IPADDR_OF_YOUR_HWMACHINE}#${IPADDR_OF_YOUR_HWMACHINE}#g" /c/Windows/System32/drivers/etc/hosts

```

* On the VirtualBox VM where you run the MongoDB database used by the `Pesto API`, If this machine is a `GNU/Linux`, in bash shell:

```bash

# --- 
# IP address of the VM on which the Mongo DB runs
export IPADDR_OF_YOUR_VM="192.168.37.202"
# --- 
# IP address of the Machine on which the UI and API run
export IPADDR_OF_YOUR_HWMACHINE="192.168.37.236"
# ---
# Add the host for the machine hosting your MongoDB
export PESTO_MONGO_HOST=mongo.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | sudo tee -a /etc/hosts
export PESTO_UI_FQDN=ui.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_HWMACHINE}      ${PESTO_UI_FQDN}" | sudo tee -a /etc/hosts
export PESTO_API_FQDN=api.pesto.io
echo "# ---- " | sudo tee -a /etc/hosts
echo "${IPADDR_OF_YOUR_HWMACHINE}      ${PESTO_API_FQDN}" | sudo tee -a /etc/hosts
# ---
# if you're dhcp, you will need to update the IP Addresses everytime the DHCP server updates the IP Addresses of the machines you run Pesto API and Pesto UI on:  


# --- # --- # --- # --- # --- # --- # --- # --- # --- #
# -- UPDATING IP ADDRESS OF THE VM WHERE MONGO DB RUNS
# --- # --- # --- # --- 
# -- 
export OLD_IPADDR_OF_YOUR_VM="192.168.129.202"
export IPADDR_OF_YOUR_VM="192.168.37.202"
sed -i "s#${OLD_IPADDR_OF_YOUR_VM}#${IPADDR_OF_YOUR_VM}#g" /etc/hosts

# --- # --- # --- # --- # --- # --- # --- # --- # --- #
# -- UPDATING IP ADDRESS OF THE HARDWARE MACHINE 
# --- # --- # --- # --- 
# - WHERE I HAVE MY [VSCODE] and I 
# - run locally the code in dev mode : 
# - Pesto API and the frontend
export OLD_IPADDR_OF_YOUR_HWMACHINE="192.168.225.202"
export IPADDR_OF_YOUR_HWMACHINE="192.168.37.236"
sed -i "s#${OLD_IPADDR_OF_YOUR_HWMACHINE}#${IPADDR_OF_YOUR_HWMACHINE}#g" /etc/hosts

```

#### Start the database

Before starting `Pesto API` (and then `Pesto UI`), you need to provision a **MongoDB** database service on the VirtualBox VM.

* Git clone this repo in the VirtualBox VM, and run this:

```bash
# ---
# The FQDN you are going to configure in your :
#  /C/Windows/System32/drivers/etc/hosts
#  /etc/hosts
#  echo "${IPADDR_OF_YOUR_VM}      ${PESTO_MONGO_HOST}" | tee -a /C/Windows/System32/drivers/etc/hosts
#  echo "# ---- " | tee -a /C/Windows/System32/drivers/etc/hosts
# ---
# export PESTO_MONGO_HOST=mongo.pesto.io
# source ./../.env.sh
# docker-compose up -d

# ---
# or just : 
# export PESTO_MONGO_HOST=mongo.myhome.io
export PESTO_MONGO_HOST=mongo.pesto.io
pnpm run db:start

# ---
# To restart with an empty database
# export PESTO_MONGO_HOST=mongo.myhome.io
export PESTO_MONGO_HOST=mongo.pesto.io
pnpm run db:scratch

```

### Start the Pesto API

To start the Pesto API, refer to [the Pesto API repository](https://github.com/3forges/pesto-api).

### Start the Pesto UI

Finally, you can now start the Pesto UI!

* Start the web app:

```bash
export PESTO_API_PORT="3000"
export PESTO_API_HOST="api.pesto.io"
export PESTO_API_HTTP_SCHEME="http"
pnpm i && pnpm dev
```

* Start the tauri app:

```bash
export PESTO_API_PORT="3000"
export PESTO_API_HOST="api.pesto.io"
export PESTO_API_HTTP_SCHEME="http"

pnpm i && pnpm tauri dev

# ---
# or : 
# - 
# cd src-tauri/ && pnpm tauri dev
```



## ANNEX: Issues References

### Vite and `Reference Error: process is not defined`

* grateful thanks to <https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg>
* Official reference in `vite` docs : <https://vitejs.dev/guide/env-and-mode>
* <https://github.com/vitejs/vite/issues/9539>

Solution:

* Add `loadEnv` to the `vite.config.ts` dependencies.
