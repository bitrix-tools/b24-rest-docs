# Пункт в меню настроек сайта и страницы LANDING_SETTINGS

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)

Виджет `LANDING_SETTINGS` добавляет пункт приложения в меню настроек сайта или страницы в режиме редактирования.

Для встраивания в разделе `landing` используется внутренний метод модуля `landing.repo.bind`, а не [placement.bind](../../widgets/placement-bind.md).

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `LANDING_SETTINGS` | Пункт в меню настроек сайта или страницы ||
|#

### Где находится в интерфейсе

Откройте сайт или страницу в режиме редактирования. В правом верхнем углу перейдите в *Возможности сайта > Настройки (⚙️)*. Пункт приложения с `PLACEMENT=LANDING_SETTINGS` отображается последним пунктом в левом меню слайдера.

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
    [PLACEMENT] => LANDING_SETTINGS
    [PLACEMENT_OPTIONS] => {"SITE_ID":"30","LID":"30"}
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

Для `LANDING_SETTINGS` в контекст передаются ключи:

- `SITE_ID` — идентификатор сайта, в настройках которого открыт виджет
- `LID` — идентификатор страницы, из режима редактирования которой был вызван виджет

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
          "PLACEMENT": "LANDING_SETTINGS",
          "PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-settings-handler.php",
          "TITLE": "Мои настройки"
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
                    PLACEMENT: 'LANDING_SETTINGS',
                    PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-settings-handler.php',
                    TITLE: 'Мои настройки'
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
                        'PLACEMENT' => 'LANDING_SETTINGS',
                        'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-settings-handler.php',
                        'TITLE' => 'Мои настройки',
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
        echo 'Error binding landing settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.bind',
        {
            fields: {
                PLACEMENT: 'LANDING_SETTINGS',
                PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-settings-handler.php',
                TITLE: 'Мои настройки'
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
                'PLACEMENT' => 'LANDING_SETTINGS',
                'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-settings-handler.php',
                'TITLE' => 'Мои настройки',
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
- [{#T}](./landing-repo-unbind.md)
- [{#T}](../../widgets/ui-interaction/index.md)
- [{#T}](../../widgets/bx24-widget-methods.md)
