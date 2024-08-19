# Как использовать вложения

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

Вложения можно применять к любым сообщениям (пользователя или бота) и уведомлениям в рамках мессенджера.

![Вложения](./_images/attach1.png)

Вы собираете объект **Вложение** и передаете его в метод отправки сообщения в ключ **ATTACH** (это может быть **полная** или **сокращенная** форма вложения).

## Полная версия объекта ATTACH

{% list tabs %}

- JS

    ```js
    ATTACH: {
        ID: 1,
        COLOR_TOKEN: "secondary",
        COLOR: "#29619b",
        BLOCKS: [
            {...},
            {...},
        ]
    }
    ```

- PHP

    ```php
    "ATTACH" => Array(
        "ID" => 1,
        "COLOR_TOKEN" => "secondary",
        "COLOR" => "#29619b",
        "BLOCKS" => Array(
            array(...),
            array(...),
        )
    )
    ```

{% endlist %}

**Ключи массива**:
- `ID` — идентификатор блока
- `COLOR_TOKEN` — отвечает за цветовое выделение вложения. Может принимать одно из следующих значений:
  - `primary`
  - `secondary`
  - `alert`
  - `base`
    По умолчанию имеет значение `base`
- `COLOR` — отвечает за цветовое выделение вложения в чате. Используется для обратной совместимости в чатах открытых линий и уведомлениях. По умолчанию цвет вложения назначается в цвет чата получателя (или, если это уведомление, в цвет текущего пользователя). Данный ключ можно не задавать, если не требуется
- `BLOCKS` должен содержать блоки разметки, которые мы рассмотрим чуть ниже

![объект ATTACH](./_images/attach_variants.png)

## Пример:

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
        BX24.callMethod(
        'imbot.message.add',
        {
            DIALOG_ID: 'chat20921',
            MESSAGE: 'Вложение с цветом primary',
            ATTACH: {
                ID: 1,
                COLOR_TOKEN: "primary"
                COLOR: "#29619b",
                BLOCKS: [
                    {
                        MESSAGE: "API будет доступно в обновлении [B]im 24.0.0[/B]"
                    }
                ]
            }
        }
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP

    {% include [Пояснение о restCommand](../../_includes/rest-command.md) %}

    ```php
    restCommand(
        'imbot.message.add',
        Array(
            "DIALOG_ID" => $_REQUEST['data']['PARAMS']['DIALOG_ID'],
            "MESSAGE" => "Вложение с цветом primary",
            "ATTACH" => Array(
                "ID" => 1,
                "COLOR_TOKEN" => "primary"
                "COLOR" => "#29619b",
                "BLOCKS" => Array(
                    Array(
                        "MESSAGE" => "API будет доступно в обновлении [B]im 24.0.0[/B]"
                    )
                )
            )
        ),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

## Краткая версия объекта ATTACH

Если устраивает, что вложение находится внизу сообщения и указывать цвет не требуется, можно использовать **краткую** версию:

{% list tabs %}

- JS

    ```js
    ATTACH: [
        {...},
        {...},
    ]
    ```

- PHP

    ```php
    "ATTACH" => Array(
        array(...),
        array(...),
    )
    ```

{% endlist %}

В отличие от полного варианта, на первом уровне сразу указываются блоки разметки, без объявления ключа **BLOCKS**.

![Краткая версия ATTACH](./_images/short_attach.png)

## Пример:

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'imbot.message.add',
        {
            DIALOG_ID: 'chat20921',
            MESSAGE: 'Блок текста',
            ATTACH: [
                MESSAGE: "API будет доступно в обновлении [B]im 24.0.0[/B]"
            ]
            
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP

    {% include [Пояснение о restCommand](../../_includes/rest-command.md) %}

    ```php
    restCommand(
        'imbot.message.add',
        Array(
            "DIALOG_ID" => $_REQUEST['data']['PARAMS']['DIALOG_ID'],
            "MESSAGE" => "Блок текста",
            "ATTACH" => Array(
                "MESSAGE" => "API будет доступно в обновлении [B]im 24.0.0[/B]"
            )
        ),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

{% note warning %}

Из-за сложности структуры, вложения автоматически не добавляются при отправке в XMPP, почту или в виде PUSH-уведомления на телефон.

{% endnote %}
