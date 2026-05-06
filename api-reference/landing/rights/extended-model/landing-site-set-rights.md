# Установить права доступа для сайта landing.site.setRights

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или пользователь с правом «полный доступ» к разделу «Сайты и магазины»

Метод `landing.site.setRights` устанавливает права доступа в расширенной модели прав для указанного сайта.

Метод работает только в расширенной модели прав. Если в разделе «Сайты и магазины» включена ролевая модель, вызов вернет `true`, но сохраненные права не будут применяться. Чтобы включить расширенную модель прав, используйте метод [landing.role.enable](../landing-role-enable.md) со значением `mode: 0`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md)

Специальное значение `0` позволяет сохранить отдельный набор прав. Индивидуальные права конкретного сайта задаются по его `id` ||
|| **rights**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Объект формата:

```json
{
    "access_code_1": ["operation_1", "operation_2"],
    "access_code_2": ["operation_1"]
}
```

где:
- `access_code_n` — код доступа
- `operation_n` — код операции

Список кодов доступа и операций описан [ниже](#rights). Метод полностью заменяет ранее сохраненные индивидуальные права для сайта.

Если параметр не передать, передать пустой объект `{}` или пустой массив `[]`, метод очистит индивидуальные права сайта ||
|#

### Параметр rights {#rights}

#|
|| **Название**
`тип` | **Описание** ||
|| **<ACCESS_CODE>**
[`string[]`](../../../data-types.md) | Список операций для одного кода доступа.

Возможные значения:
`denied` - запретить доступ
`read` - разрешить просмотр сайта
`edit` - разрешить изменять страницы сайта
`sett` - разрешить изменять настройки сайта
`public` - разрешить публикацию сайта
`delete` - разрешить перемещать сайт в корзину и восстанавливать его

Если в наборе есть `denied`, все остальные операции для этого кода доступа игнорируются.

Если в наборе нет `read` и нет `denied`, метод автоматически добавит `read`. Неизвестные коды операций игнорируются без ошибки ||
|#

В качестве ключей объекта `rights` используйте коды доступа Битрикс24. Частые варианты:

- `U<ID>` - пользователь
- `G<ID>` - группа пользователей
- `DR<ID>` - отдел вместе с подотделами
- `UA` - все пользователи, включая гостей
- `AU` - все авторизованные пользователи
- `SG<ID>` - рабочая группа

Если доступ нужен только для авторизованных пользователей, используйте `AU`. Код `UA` открывает доступ всем пользователям, включая гостей. Метод не проверяет формат кода доступа при сохранении. Если передать неподдерживаемый код, запрос завершится без ошибки, но такой код не даст рабочего доступа.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 645,
        "rights": {
          "AU": ["read"],
          "U3": ["read", "edit", "sett", "public"]
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.setRights.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 645,
        "rights": {
          "AU": ["read"],
          "U3": ["read", "edit", "sett", "public"]
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.setRights.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.site.setRights',
            {
                id: 645,
                rights: {
                    AU: ['read'],
                    U3: ['read', 'edit', 'sett', 'public']
                }
            }
        );

        const result = response.getData().result;
        console.info(result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.site.setRights',
                [
                    'id' => 645,
                    'rights' => [
                        'AU' => ['read'],
                        'U3' => ['read', 'edit', 'sett', 'public'],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting site rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.setRights',
        {
            id: 645,
            rights: {
                AU: ['read'],
                U3: ['read', 'edit', 'sett', 'public']
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.site.setRights',
        [
            'id' => 645,
            'rights' => [
                'AU' => ['read'],
                'U3' => ['read', 'edit', 'sett', 'public'],
            ],
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1775055086,
        "finish": 1775055086.8533,
        "duration": 0.8533000946044922,
        "processing": 0,
        "date_start": "2026-04-01T17:51:26+03:00",
        "date_finish": "2026-04-01T17:51:26+03:00",
        "operating_reset_at": 1775055686,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат сохранения прав.

- `true` — права успешно сохранены или очищены
- `false` — сайт с таким `id` не найден или уже находится в корзине

Метод не возвращает итоговый список прав.

После вызова проверьте примененные права методом [landing.site.getRights](./landing-site-get-rights.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | У пользователя нет доступа к разделу «Сайты и магазины» ||
|| `IS_NOT_ADMIN` | Для метода нужны права администратора или право «полный доступ» к разделу «Сайты и магазины» ||
|| `FEATURE_NOT_AVAIL` | Настройка прав недоступна на текущем тарифе. Чтобы работать с правами, перейдите на другой тариф ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-get-rights.md)
- [{#T}](../landing-role-is-enabled.md)
- [{#T}](../landing-role-enable.md)
