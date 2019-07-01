# Setup
First, let's set it up. Copy/paste this into your welcome message:
```html
<script type=config>

</script>

<script src="https://wingysam.github.io/wm-framework/bundle.js"></script>
```

# Configuration
Now, let's configure it.
These go in the `<script type=config>`.
These keys are case-insensitive, for example, you can write `Worldname` or `worldname` (or even `wOrLdNaMe`).

Here's an example config:
```html
<script type=config>
worldname The World
tag A subtitle
</script>

<script src="https://wingysam.github.io/wm-framework/bundle.js"></script>
```

## World Name
The title defaults to the world name, but can also be configured with `worldname`.
You may want to configure it so it is not all capitals.
```
worldname Rabbithole
```

## World Name Font
By setting `worldnamefont` to `bh` the title's font is the Blockheads font.
```
worldnamefont bh
```

## Tag
The subtitle has no default, but can be defined with `tag`.
```
tag Join the wonderland down to the Rabbit Hole!
```

## Background/Background Size
You can set a CSS background with `background` and `backgroundsize`.
```
background url('http://i63.tinypic.com/qq4dxc.png')
backgroundsize cover
```
Or:
```
background lightgreen
```

## VotePopup
Prompt users to vote every six hours (voting on another server using the framework is detected).
Input is BlockheadsFans Serverlist ID, then optionally a vote request message.
```
votepopup 6877 Hey! I'd appreciate if you'd vote for the server. Thanks!
```

## Music
Play a music file when the person interacts with the welcome message with `music`.
Input is an audio file URL.
```
music http://23.237.126.42/ost/harvest-moon-snes/kfhknozv/03_Naming%20Screen.mp3
```

## Badges
You can have badges that are fetched from the internet after the Welcome Message loads with these.
You can have the label for the badge after the badge input.

### BHFans
Input is a BlockheadsFans server ID.
You can get this from the URL of your server on [the BlockheadsFans Server List](https://blockheadsfans.com/servers).
It is a 4 digit number.
```
bhfans 6877
```

### Free Mac Servers
Number of online players in a Free Mac Server from Wingysam is configured with `wingy`.
ID is in the URL of your world in the [Free Mac Servers Owner Portal](https://block.wingysam.xyz/op).
```
wingy 1189b0f547908e1c3328e62303f7882c
```

# Lists
Start a line with `@` and every line after it until a blank line will be in a list.
```
@Rules
No hacking
No duping

@Staff
Wingy
majicDave
Katnis Everdin
```