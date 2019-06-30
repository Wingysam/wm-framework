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
background url('http://i63.tinypic.com/qq4dxc.png')
backgroundsize cover
```

### List
```
@Admins
Wingy
majicDave
Katnis Everdin

@Mods
Mod 1
Mod 2

@Rules
No hacking
No duping
```
End the list with a blank line

## Custom HTML
Add a `div` with ID `custom-top` or `custom-bottom`.

`custom-top` appears at the top, `custom-middle` is above lists but under title, `custom-bottom` is under lists.