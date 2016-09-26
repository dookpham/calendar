# Calendar
> A tool for composing events on a calendar view.

### Author
- Duke Pham

## Table of Contents
1. [Usage](#usage)
2. [Testing](#testing)
3. [Notes](#notes)

# Usage
Clone the repo:
```sh
$ git clone https://github.com/dookpham/calendar.git
```

Go to the root folder and open the index.html file:
```sh
$ cd calendar
$ open dist/index.html
```
Voila!

A 'Randomize' feature has been added to generate random event layouts for testing and general purpose calendar enjoyment!

# Testing
In order to run tests, npm and mocha need to be installed first.  
Once this is done ->

In the root directory, from the terminal:
```sh
$ npm install
$ npm test
```

All tests should pass.


# Notes
Typically I would .gitignore the bundle.js file, but for this exercise, everything is expected to work 'out-of-the-box', therefore the bundle.js has been left in.
