# Пункт редактирования блока LANDING_BLOCK_*

> Scope: [`landing`](../../scopes/permissions.md)

Виджет `LANDING_BLOCK_<CODE>` добавляет пункт приложения рядом с действиями редактирования блока в редакторе страницы.

Для встраивания в разделе `landing` используется внутренний метод модуля `landing.repo.bind`, а не [placement.bind](../../widgets/placement-bind.md).

Код места встраивания зависит от кода блока и задается в формате `LANDING_BLOCK_<CODE>`.

Если нужно встроить приложение в зарегистрированный вами пользовательский блок, вместо `<CODE>` укажите идентификатор блока. Например, для блока с идентификатором `1132` используйте код `LANDING_BLOCK_repo_1132`. Регистр символов в коде не важен.

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `LANDING_BLOCK_<CODE>` | Пункт редактирования конкретного блока ||
|| `LANDING_BLOCK_*` | Пункт редактирования для всех блоков ||
|#

### Где находится в интерфейсе

Откройте страницу в режиме редактирования и наведите курсор на блок. В стандартных действиях блока, справа от кнопки *Редактировать* отображается кнопка *Еще*. Пункт приложения с `PLACEMENT=LANDING_BLOCK_<CODE>` или `PLACEMENT=LANDING_BLOCK_*` отображается в выпадающем списке кнопки *Еще*.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php
Array
(
    [DOMAIN] => example.bitrix24.ru
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 0123456789abcdef0123456789abcdef
    [APPLICATION_SCOPE] => crm,placement,landing
    [APPLICATION_TOKEN] => xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    [AUTH_ID] => 6061e72600631fcd00005a4b00000001f0f1076700000000f69dd5fc643d9ce2fdbc1
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 50e00aa340631fcd00005a4b00000001f0f1071111116580a5b83c2de639ef28c12
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [member_id] => abcdef1234567890abcdef1234567890
    [status] => F
    [PLACEMENT] => LANDING_BLOCK_*
    [PLACEMENT_OPTIONS] => {"ID":"996","CODE":"43.4.cover_with_price_text_button_bgimg","LID":"30"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../../widgets/_includes/widget_data.md) %}

### Дополнительные данные

#|
|| **Параметр**
`тип` | **Описание** ||
|| **APPLICATION_SCOPE**
[`string`](../../data-types.md) | Список scope, доступных приложению ||
|| **APPLICATION_TOKEN**
[`string`](../../data-types.md) | Токен приложения для безопасной обработки событий ||
|| **SERVER_ENDPOINT**
[`string`](../../data-types.md) | Адрес сервера авторизации Битрикс24, необходимый для обновления токенов OAuth 2.0 ||
|#

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Для `LANDING_BLOCK_<CODE>` в контекст передаются ключи:

- `ID` — идентификатор блока
- `CODE` — символьный код блока
- `LID` — идентификатор страницы, на которой открыт блок

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "fields": {
          "PLACEMENT": "LANDING_BLOCK_04.1.one_col_fix_with_title",
          "PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-block-handler.php",
          "TITLE": "Мой виджет для блока"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/landing.repo.bind
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.repo.bind',
            {
                fields: {
                    PLACEMENT: 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                    PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-block-handler.php',
                    TITLE: 'Мой виджет для блока'
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
                'landing.repo.bind',
                [
                    'fields' => [
                        'PLACEMENT' => 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                        'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-block-handler.php',
                        'TITLE' => 'Мой виджет для блока',
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
        echo 'Error binding landing block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.bind',
        {
            fields: {
                PLACEMENT: 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-block-handler.php',
                TITLE: 'Мой виджет для блока'
            }
        },
        function(result)
        {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.repo.bind',
        [
            'fields' => [
                'PLACEMENT' => 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-block-handler.php',
                'TITLE' => 'Мой виджет для блока',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Зарегистрировать виджет для всех блоков

Если приложению нужен единый обработчик для всех блоков, используйте код `LANDING_BLOCK_*`.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "fields": {
          "PLACEMENT": "LANDING_BLOCK_*",
          "PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-block-handler.php",
          "TITLE": "Мой виджет для блока"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/landing.repo.bind
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.repo.bind',
            {
                fields: {
                    PLACEMENT: 'LANDING_BLOCK_*',
                    PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-block-handler.php',
                    TITLE: 'Мой виджет для блока'
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
                'landing.repo.bind',
                [
                    'fields' => [
                        'PLACEMENT' => 'LANDING_BLOCK_*',
                        'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-block-handler.php',
                        'TITLE' => 'Мой виджет для блока',
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
        echo 'Error binding landing block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.bind',
        {
            fields: {
                PLACEMENT: 'LANDING_BLOCK_*',
                PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-block-handler.php',
                TITLE: 'Мой виджет для блока'
            }
        },
        function(result)
        {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.repo.bind',
        [
            'fields' => [
                'PLACEMENT' => 'LANDING_BLOCK_*',
                'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-block-handler.php',
                'TITLE' => 'Мой виджет для блока',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Как обновить блок из приложения

После работы с блоком, приложение может обновить его через команду `refreshBlock` метода [BX24.placement.call](../../widgets/ui-interaction/bx24-placement-call.md).

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"PLACEMENT":"refreshBlock","PARAMS":{"id":123}}' \
      "https://**put_your_bitrix24_address**/rest/placement.call?auth=**put_access_token_here**"
    ```

- JS

    ```js
    try
    {
        await $b24.callMethod(
            'placement.call',
            {
                type: 'refreshBlock',
                params: {
                    id: 123
                }
            }
        );

        console.log('Блок успешно обновлен');
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
                'placement.call',
                [
                    'PLACEMENT' => 'refreshBlock',
                    'PARAMS' => [
                        'id' => 123,
                    ]
                ]
            );

        $result = $response->getResponseData()->getResult();
        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при обновлении блока: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'refreshBlock',
        {
            id: 123
        },
        function()
        {
            console.log('Блок успешно обновлен');
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.call',
        [
            'PLACEMENT' => 'refreshBlock',
            'PARAMS' => [
                'id' => 123,
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./landing-repo-unbind.md)
- [{#T}](../../widgets/ui-interaction/bx24-placement-call.md)
- [{#T}](../../widgets/bx24-widget-methods.md)
