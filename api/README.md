# feodal

### getMap

Запрос:

/api?method=getMap&token=XXX

Входные параметры:

token - токен пользователя, если пользователь не авторизован, запрос вернет ошибку.

Ответ:

data:

    {"map":

        {

            "layer1": "[x,x,x,x]",

            "layer2": "[x,x,x,x]",

            "layer3": "[x,x,x,x]"

        }

    }

### getScene

Запрос:

/api?method=getScene&mapHash=xxxxxxxxx&unitsHash=xxxxxxxx&token=XXX

Входные параметры:

mapHash -хеш карты

unitsHash -хеш юнитов

token - токен пользователя, если пользователь не авторизован, запрос вернет ошибку.

Если mapHash на сервере не обновился, то вернет в "castles" и в "villages" ничего.
Если unitsHash на сервере не обновился, то вернет в "units" ничего.

Ответ:

data:

    {
        "unitsHash": "xxxxxxxxxx",
        "mapHash": "xxxxxxxxxx",
        "castles":
            [
                {
                    "id":"X",
                    "ownerName":"X",
                    "Level":"X",
                    "posX":"xx.xxx",
                    "posY":"xx.xxx",
                },
                ...
            ],
        "villages":
            [
                {
                    "id":"X",
                    "name":"abc",
                    "level":"X",
                    "population":"XXX",
                    "posX":"xx.xxx",
                    "posY":"xx.xxx",
                    "money":"XXX"
                },
            ...
            ],
        "units":

            [
                {
                    "id":"X",
                    "ownerId":"X",
                    "type":"X",
                    "hp":"X",
                    "posX":"xx.xxx",
                    "posY":"xx.xxx",
                    "status":"abc",
                    "direction": "X"
                },
            ...
            ]
    }

### getUnitsTypes

Запрос:

/api?method=getUnitsTypes&token=XXX

Входные параметры:

token - токен пользователя, если пользователь не авторизован, запрос вернет ошибку.

Ответ:

data:

    {
        [
            {
                "id": "X",
                "name": "abc",
                "hp": "xx",
                "cost": "xx",
                "damage": "x",
                "speed": "x"
            },
            ...
        ]
    }

### getCastle

Запрос:

/api?method=getCastle&token=XXX

Входные параметры:

token - токен пользователя, если пользователь не авторизован, запрос вернет ошибку.

Если у пользователя есть замок, то вернет data.

Если у пользователя нет замка, то запрос создаст новый и вернет data.

Ответ:

data:

    {
        "castle":
            {
                "id": "X",   //id замка
                "Level": "X",   //уровень замка
                "posX": "xx.xxx",   //координаты замка по X, где единица - это один тайл.
                "posY": "xx.xxx",  //координаты замка по Y, где единица - это один тайл.
                "money": "xxx"   //деньги игрока
            }
    }

### upgradeCastle

Запрос:

/api?method=upgradeCastle&token=XXX

Входные параметры:

token - токен пользователя, если пользователь не авторизован, запрос вернет ошибку.

Если у пользователя есть замок и достаточно денег для улучшения замка, то вернет data, иначе ошибку

Ответ:

data:

    {
        "money": "xxx" //деньги игрока
    }

### buyUnit

Запрос:

/api?method=buyUnit&unitType=Y&token=XXX

Входные параметры:

unitType - id типа юнита 

token - токен пользователя, если пользователь не авторизован, запрос вернет ошибку.

Если у пользователя есть замок и достаточно денег для покупки юнита, то вернет data, иначе ошибку

Ответ:

data:

    {
        "money": "xxx" //деньги игрока
    }

### robVillage

Запрос:

/api?method=robVillage&village=X&token=XXX

Входные параметры:

village - id деревни 

token - токен пользователя, если пользователь не авторизован, запрос вернет ошибку.

Если в деревне достаточно денег, то вернет data, если денег в деревне слишком мало, то вернет data, а деревня будет уничтожена.

Ответ:

data:

    {
        "money": "xxx" //деньги игрока
    }

### destroyVillage

Запрос:

/api?method=destroyVillage&village=X&token=XXX

Входные параметры:

village - id деревни 

token - токен пользователя, если пользователь не авторизован, запрос вернет ошибку.

Уничтожает деревню, забирая всё золото.

Ответ:

data:

    {
        "money": "xxx" //деньги игрока
    }