Blockheads Welcome Message Framework
# [Guide](guide)

## Add to WM
Paste this as your welcome message:
```html
<script type=config>

</script>

<script src="https://wingysam.github.io/wm-framework/bundle.js"></script>
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
key1 value1
key2 value2
```

### List
```
@List Name
List Item 1
List Item 2

@List Name 2
List Item 1
List Item 2
```
End the list with a blank line

## Custom HTML
Add a `div` with ID `custom-top` or `custom-bottom`.

`custom-top` appears at the top, `custom-middle` is above lists but under title, `custom-bottom` is under lists.