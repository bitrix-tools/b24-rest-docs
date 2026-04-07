# Пункт контекстного меню сообщения IM_CONTEXT_MENU

> Scope: [`im`](../../scopes/permissions.md)

Виджет добавляет свой пункт в контекстное меню сообщения в чате.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `IM_CONTEXT_MENU` | Пункт контекстного меню сообщения ||
|#

### Где находится в интерфейсе

Откройте любой чат и наведите курсор на сообщение. В строке действий сообщения нажмите кнопку `...` и откройте контекстное меню. Наведите курсор на *Еще*, чтобы открыть дополнительные пункты меню. Пункт приложения с `PLACEMENT=IM_CONTEXT_MENU` отображается в конце списка действий над сообщением.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 99c80eff6378726287350416ee5fef0
    [AUTH_ID] => 6061e72600631fcd00005a4b00000001f0f1076700000000f69dd5fc643d9ce2fdbc1
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 50e00aa340631fcd00005a4b00000001f0f1071111116580a5b83c2de639ef28c12
    [member_id] => da45a03b265ed12127f8a258d793cc5d
    [status] => F
    [PLACEMENT] => IM_CONTEXT_MENU
    [PLACEMENT_OPTIONS] => {"messageId":84889, "dialogId":"chat1489"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Для `IM_CONTEXT_MENU` в контекст передаются ключи:

- `dialogId` — идентификатор текущего чата
- `messageId` — идентификатор выбранного сообщения

## OPTIONS при регистрации через placement.bind

Для `IM_CONTEXT_MENU` метод `placement.bind` поддерживает параметры `OPTIONS`.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **extranet**
[`string`](../../data-types.md) | Доступ в экстранете, по умолчанию `N`.

Возможные значения:
- `N` — приложение недоступно для экстранет-пользователей
- `Y` — приложение доступно для экстранет-пользователей
||
|| **context**
[`string`](../../data-types.md) | Контекст показа, по умолчанию `ALL`. Можно передать несколько значений через `;`.

Возможные значения:
- `ALL` — все чаты
- `USER` — личные чаты пользователей, кроме чатов с ботами
- `CHAT` — групповые чаты, кроме `LINES` и `CRM`
- `LINES` — чаты открытых линий
- `CRM` — чаты, созданные в рамках CRM

Если передан `ALL` вместе с другими значениями, используется только `ALL`. Неверное значение вызывает ошибку регистрации
||
|| **role**
[`string`](../../data-types.md) | Роль пользователя, по умолчанию `USER`.

Возможные значения:
- `USER` — приложение доступно всем пользователям
- `ADMIN` — приложение доступно только администраторам портала
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "IM_CONTEXT_MENU",
        "HANDLER": "https://your-domain.com/widgets/im-context-menu-handler.php",
        "TITLE": "Мой пункт меню",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой пункт меню"
          },
          "en": {
            "TITLE": "My menu item"
          }
        },
        "OPTIONS": {
          "context": "ALL",
          "role": "USER",
          "extranet": "N"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/placement.bind
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'placement.bind',
            {
                PLACEMENT: 'IM_CONTEXT_MENU',
                HANDLER: 'https://your-domain.com/widgets/im-context-menu-handler.php',
                TITLE: 'Мой пункт меню',
                LANG_ALL: {
                    ru: {
                        TITLE: 'Мой пункт меню',
                    },
                    en: {
                        TITLE: 'My menu item',
                    }
                },
                OPTIONS: {
                    context: 'ALL',
                    role: 'USER',
                    extranet: 'N',
                }
            }
        );

        const result = response.getData().result;
        if (result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
    catch (error)
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bind',
                [
                    'PLACEMENT' => 'IM_CONTEXT_MENU',
                    'HANDLER' => 'https://your-domain.com/widgets/im-context-menu-handler.php',
                    'TITLE' => 'Мой пункт меню',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой пункт меню',
                        ],
                        'en' => [
                            'TITLE' => 'My menu item',
                        ],
                    ],
                    'OPTIONS' => [
                        'context' => 'ALL',
                        'role' => 'USER',
                        'extranet' => 'N',
                    ],
                ]
            );

        $result = $response->getResponseData()->getResult();
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.bind',
        {
            PLACEMENT: 'IM_CONTEXT_MENU',
            HANDLER: 'https://your-domain.com/widgets/im-context-menu-handler.php',
            TITLE: 'Мой пункт меню',
            LANG_ALL: {
                ru: { TITLE: 'Мой пункт меню' },
                en: { TITLE: 'My menu item' }
            },
            OPTIONS: {
                context: 'ALL',
                role: 'USER',
                extranet: 'N'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bind',
        [
            'PLACEMENT' => 'IM_CONTEXT_MENU',
            'HANDLER' => 'https://your-domain.com/widgets/im-context-menu-handler.php',
            'TITLE' => 'Мой пункт меню',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой пункт меню',
                ],
                'en' => [
                    'TITLE' => 'My menu item',
                ],
            ],
            'OPTIONS' => [
                'context' => 'ALL',
                'role' => 'USER',
                'extranet' => 'N',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)

