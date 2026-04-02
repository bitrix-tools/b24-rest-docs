# Привязать к группе Социальной сети landing.site.bindingToGroup

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Размещение в Расширениях в разделе База знаний и правами на редактирование Базы знаний в указанной группе

Метод `landing.site.bindingToGroup` привязывает Базу знаний к группе Социальной сети.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../../data-types.md) | Идентификатор сайта Базы знаний.

`id` можно получить, например, из метода [landing.site.getList](../../site/landing-site-get-list.md) в поле `ID` ||
|| **groupId**^*^
[`integer`](../../../data-types.md) | Идентификатор группы Социальной сети.

`groupId` можно получить:
- из интерфейса группы
- из результата метода [landing.site.getGroupBindings](./landing-site-get-group-bindings.md) в поле `BINDING_ID` для уже существующих привязок
- методом [socialnetwork.api.workgroup.list](../../../sonet-group/socialnetwork-api-workgroup-list.md)
- методом [sonet_group.get](../../../sonet-group/sonet-group-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример привязки Базы знаний к группе, где:
- `id` — идентификатор сайта Базы знаний
- `groupId` — идентификатор группы

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 32,
        "groupId": 174
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.bindingToGroup.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 32,
        "groupId": 174,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.bindingToGroup.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.bindingToGroup',
    		{
    			id: 32,
    			groupId: 174
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
                'landing.site.bindingToGroup',
                [
                    'id' => 32,
                    'groupId' => 174,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding site to group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.bindingToGroup',
        {
            id: 32,
            groupId: 174
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
        'landing.site.bindingToGroup',
        [
            'id' => 32,
            'groupId' => 174,
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
        "start": 1774952664,
        "finish": 1774952665.017161,
        "duration": 1.0171608924865723,
        "processing": 0,
        "date_start": "2026-03-31T13:24:24+03:00",
        "date_finish": "2026-03-31T13:24:25+03:00",
        "operating_reset_at": 1774953265,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат привязки:

- `true` — привязка выполнена
- `false` — привязка не выполнена

Метод может вернуть `false` без ошибки, если:
- у пользователя нет права `Размещение в Расширениях` в разделе «База знаний»
- у пользователя нет прав на редактирование Базы знаний в указанной группе
- для группы уже существует привязка Базы знаний ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Недостаточно прав."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: groupId | Вызов метода без `groupId` ||
|| `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: id | Вызов метода без `id` ||
|| `TYPE_ERROR` | Bitrix\Landing\PublicAction\Site::bindingToGroup(): Argument #2 ($groupId) must be of type int, string given | Параметр `groupId` передан строкой вместо `int` ||
|| `TYPE_ERROR` | Bitrix\Landing\PublicAction\Site::bindingToGroup(): Argument #1 ($id) must be of type int, string given | Параметр `id` передан строкой вместо `int` ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-unbinding-from-group.md)
- [{#T}](./landing-site-get-group-bindings.md)
- [{#T}](./landing-site-binding-to-menu.md)
- [{#T}](./landing-site-get-menu-bindings.md)
- [{#T}](./index.md)
