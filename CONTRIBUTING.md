# Contributing

So you're interested in giving us a hand? That's awesome! We've put together some brief guidelines that should help you get started quickly and easily.

Please, if you see anything wrong you can fix/improve it :ghost:

## Installing the project

1. Fork this project on github
1. Clone this project on your local machine
1. Then, you need to install `node` and `npm` to run the mainly packages.
1. After installed `node` and `npm`, run this script:

```bash
$ npm install
```

That's it! You're done.

## How to work

We are using a bunch of things to put all together and make the work easy.

Dependency | Description
---------- | -----------
[NPM](http://npmjs.org) | Node package manager
[BrowserSync](http://www.browsersync.io/) | Create a `localhost` server with livereload
[Webpack](http://webpack.github.io/) | Generated a UMD bundled version

So, have some scripts that you need to know to run the project locally. It's just fews, but it's very important.

Command | Description
------- | -----------
`npm run build` | runs `$ wepback and babel` task
`npm test` | lints files

## Submitting a Pull request

1. Create your feature branch: git checkout -b feature/my-new-feature (or if you have a fix create your fix branch: git checkout -b fix/fix-that-thingy)
2. Commit your changes: git commit -m 'Add some feature'
3. Push to your remote fork branch: git push origin
   feature/my-new-feature:feature/my-new-feature
4. Submit a pull request :D
5. DFTBA


# [OpenOpenSource FTW](http://openopensource.org/)


Individuals making significant and valuable contributions are given commit-access
to the project to contribute as they see fit.
This project is more like an open wiki than a
standard guarded open source project.

There are a few basic ground-rules for contributors:

* No --force pushes or modifying the Git history in any way.
* Non-master branches ought to be used for ongoing work.
* External API changes and significant modifications ought to be subject to an internal pull-request to solicit feedback from other contributors.
* Internal pull-requests to solicit feedback are encouraged for any other non-trivial contribution but left to the discretion of the contributor.
* Contributors should attempt to adhere to the prevailing code-style.
