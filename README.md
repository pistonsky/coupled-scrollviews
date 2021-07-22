# How to start the app

This is a regular React Native project. For environment setup please refer to [official environment setup docs](https://reactnative.dev/docs/environment-setup).

Clone this repo, then run the following:
```
yarn
npx pod-install ios
```

To run on a real iOS device, please update "Signing & Capabilities" tab in Xcode.
To run on iOS, do
```
yarn ios
```
To run on android, do
```
yarn android
```

# How to run tests

I use [jest](https://jestjs.io) and [detox](https://github.com/wix/Detox) for unit and end-to-end tests.

## Prerequisites

You need to have detox installed globally on your machine to run end-to-end tests.
```
npm install -g detox-cli
brew tap wix/brew
arch -arm64 brew install applesimutils
```
If you're not on M1 mac, remove `arch -arm64` from `brew install` command.

## Running tests

### Unit tests

Use `yarn test`. It will test functionality of highlighting active profile's avatar.

### End-to-end tests

These tests are used to check how two ScrollViews are working together. When user scrolls one, another one scrolls in response.

To run tests you need to build the app first. Assuming you're on a mac, for iOS use:
```
yarn ios
```
It will output path of app binary (`.app`) - paste this path into `.detoxrc.json`. Then run:
```
detox test --configuration ios
```