local lastText = 'None'
local lastToptext = 'None'

local function sendInfo(toptext, text, icon, current, max)
    lastToptext = toptext or lastToptext
    lastText = text or lastText

    SendNUIMessage({
        message = 'info',
        toptext = lastToptext,
        text = lastText,
        icon = icon,
        current = current,
        max = max
    })
end

local function closeInfo()
    SendNUIMessage({ message = 'close' })
end

exports('Open', function(toptext, text, icon, current, max)
    sendInfo(toptext, text, icon, current, max)
end)

exports('Close', function()
    closeInfo()
end)

-- test commands
RegisterCommand('jobtask', function()
    sendInfo('Mechanic', 'Repair the vehicle', 'wrench', 50, 100)
end)

RegisterCommand('closejobtask', function()
    closeInfo()
end)
