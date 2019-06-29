WM Framework
============
Blockheads Welcome Message Framework

## Add to WM
Paste this as your welcome message:
```html
<script type=config>

</script>

<script src="https://wingysam.github.io/wm-framework/index.js"></script>
```

## Configuration
### Notes
Lower down is higher priority:
```
key val
key value
```
`key` would be `value`, **not** `val`.

### Key/Value
```
worldname Demo World
tag Tag of the world
background url('https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_960_720.jpg' cover)
backgroundsize cover
```

### List
```
@admins
Wingy
majicDave
Katnis Everdin

@mods
Mod 1
Mod 2

@rules
No hacking
No duping
```
End the list with a blank line

## Custom HTML
Add a `div` with ID `custom-top` or `custom-bottom`.

`custom-top` appears right under the title, `custom-bottom` is under *everything*.