## Usage

```lua
-- show the panel
exports.jobtask:Open(toptext, text, icon, current, max)

-- hide it
exports.jobtask:Close()
```

### Parameters

| param | type | description |
|-------|------|-------------|
| `toptext` | string | small label at the top (e.g. job name) |
| `text` | string | main description text |
| `icon` | string | font awesome icon name |
| `current` | number | current progress value |
| `max` | number | max progress value |

---

## Example

```lua
-- open
exports.jobtask:Open('Mechanic', 'Repair the vehicle', 'wrench', 0, 100)

-- update progress mid-task
exports.jobtask:Open(nil, nil, nil, 50, 100)  -- keeps previous text, just updates the numbers

-- done
exports.jobtask:Close()
```
