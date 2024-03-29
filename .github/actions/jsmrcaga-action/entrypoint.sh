#!/bin/bash

sh -c "apt install sudo"
sh -c "sudo chown -R circleci /github"
sh -c "sudo chmod -R 777 /github"

set -e

# Install netlify globally before NVM to prevent EACCESS issues
npm i -g netlify-cli

# Save its exec path to run later
NETLIFY_CLI=$(which netlify)

NODE_VERSION=$9

# We can start using INPUT_ notation instead of passing
# env variables as arg to docker
USE_NVM=$INPUT_USE_NVM

# Install node from NVM to honor .nvmrc files
if [[ $USE_NVM == "true" ]] && ([[ -n $NODE_VERSION ]] || [[ -e ".nvmrc" ]])
then
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
	[ -s "$HOME/.nvm/nvm.sh" ] && \. "$HOME/.nvm/nvm.sh"

	if [[ -n $NODE_VERSION ]]
	then
		nvm install "$NODE_VERSION"
	else
		nvm install
	fi
fi

NETLIFY_AUTH_TOKEN=$1
NETLIFY_SITE_ID=$2
NETLIFY_DEPLOY_TO_PROD=$3
BUILD_DIRECTORY=$4
FUNCTIONS_DIRECTORY=$5
INSTALL_COMMAND=$6
BUILD_COMMAND=$7
DEPLOY_ALIAS=$8

echo "---- CHRISTOS MESSAGE: Build admin"

# Install dependencies
if [[ -n $INSTALL_COMMAND ]]
then
	eval $INSTALL_COMMAND
elif [[ -f yarn.lock ]]
then
	yarn
else
	npm i
fi

eval " npm run build"

# Export token to use with netlify's cli
export NETLIFY_SITE_ID="$NETLIFY_SITE_ID"
export NETLIFY_AUTH_TOKEN="$NETLIFY_AUTH_TOKEN"

COMMAND="$NETLIFY_CLI deploy --dir=$BUILD_DIRECTORY --functions=$FUNCTIONS_DIRECTORY --message=\"$INPUT_NETLIFY_DEPLOY_MESSAGE\""

# COMMAND+=" --prod"
COMMAND+=" --alias admin"

OUTPUT=$(sh -c "$COMMAND")

NETLIFY_OUTPUT=$(echo "$OUTPUT")
NETLIFY_PREVIEW_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*(--)[a-zA-Z0-9./?=_-]*') #Unique key: --
NETLIFY_LOGS_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://app.netlify.com/[a-zA-Z0-9./?=_-]*') #Unique key: app.netlify.com
NETLIFY_LIVE_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*' | grep -Eov "netlify.com") #Unique key: don't containr -- and app.netlify.com

echo "::set-output name=NETLIFY_OUTPUT::$NETLIFY_OUTPUT"
echo "::set-output name=NETLIFY_PREVIEW_URL::$NETLIFY_PREVIEW_URL"
echo "::set-output name=NETLIFY_LOGS_URL::$NETLIFY_LOGS_URL"
echo "::set-output name=NETLIFY_LIVE_URL::$NETLIFY_LIVE_URL"

echo "---- CHRISTOS MESSAGE: admin finished"



string="$DEPLOY_ALIAS"

# Syntax to replace all occurrences of "anime" with " "
arr=(${string//","/ })

# Print each value of the array by using the loop
for trainingToBuild in "${arr[@]}"; do
	echo "---- CHRISTOS MESSAGE: Build \"$trainingToBuild\""

	# Build trainingToBuild
	eval " GATSBY_TRAINING=$trainingToBuild npm run build"

	# Export token to use with netlify's cli
	export NETLIFY_SITE_ID="$NETLIFY_SITE_ID"
	export NETLIFY_AUTH_TOKEN="$NETLIFY_AUTH_TOKEN"

	COMMAND="$NETLIFY_CLI deploy --dir=$BUILD_DIRECTORY --functions=$FUNCTIONS_DIRECTORY --message=\"$INPUT_NETLIFY_DEPLOY_MESSAGE\""

	COMMAND+=" --alias $trainingToBuild"

	OUTPUT=$(sh -c "$COMMAND")

	NETLIFY_OUTPUT=$(echo "$OUTPUT")
	NETLIFY_PREVIEW_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*(--)[a-zA-Z0-9./?=_-]*') #Unique key: --
	NETLIFY_LOGS_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://app.netlify.com/[a-zA-Z0-9./?=_-]*') #Unique key: app.netlify.com
	NETLIFY_LIVE_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*' | grep -Eov "netlify.com") #Unique key: don't containr -- and app.netlify.com

	echo "::set-output name=NETLIFY_OUTPUT::$NETLIFY_OUTPUT"
	echo "::set-output name=NETLIFY_PREVIEW_URL::$NETLIFY_PREVIEW_URL"
	echo "::set-output name=NETLIFY_LOGS_URL::$NETLIFY_LOGS_URL"
	echo "::set-output name=NETLIFY_LIVE_URL::$NETLIFY_LIVE_URL"

	echo "---- CHRISTOS MESSAGE: \"$trainingToBuild\" finished"
done
