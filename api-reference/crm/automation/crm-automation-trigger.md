# Активировать триггер crm.automation.trigger

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на изменение целевого объекта `target` 

Битрикс24 позволяет пользователям создать особый пользовательский триггер "Отследить входящий вебхук". Пользователю предлагается готовый URL вида 

```bash
https://mydomain.bitrix24.com/rest/1/not_var{{PASSWORD}}/crm.automation.trigger/?target=DEAL_not_var{{ID}}&code=nwly5
```

обращение к котрому из внешнего источника приведёт к срабатыванию триггера и соответствующему переходу элемента CRM на другую стадию воронки.

Как вы можете видеть по формату этого URL, фактически, внутри Битрикс24 создаётся [локальный входящий вебхук](../../../local-integrations/local-webhooks.md), с помощью которого происходит обращение к методу `crm.automation.trigger` с указанием конкретного объекта CRM и того уникального символьного кода триггера, который был создан самим Битрикс24 (в примере выше это `nwly5`).

Вы можете использовать метод не только с помощью входящего вебука, но и в контексте [локальных](../../../local-integrations/local-apps.md) и [тиражных](../../../market/index.md) приложений. Однако для вызова собственных триггеров, которые создаются вашим же приложением, нужно использовать метод [crm.automation.trigger.execute](./triggers/crm-automation-trigger-execute.md)

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **target***
[`string`](../../data-types.md) | Целевой объект для автоматизации, указывается в виде [`TYPENAME_ID`](../../data-types.md#object_type) (например, `LEAD_25`)
||
|| **code**
[`string`](../../data-types.md) | Уникальный символьный код триггера, настроенного в Автоматизации на конкретный статус/стадию документа. Взять параметр `code` можно из настроек триггера ||
|#

{% note info %}

В редких случаях для указанного в `target` объекта может быть обнаружено несколько триггеров. Так происходит, если:

- не передать в запрос `code` и на портале есть старые триггеры, которым не выдан `code`
- передать `code`, который окажется одинаковым для нескольких триггеров
В таком случае сработает первый триггер, который устанавливает более ранний статус объекта CRM

Также стоит учитывать, что у триггеров есть «Условия» и опция «Разрешить переходить на предыдущий статус», которые влияют на то, отработает триггер или нет.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"target":"DEAL_57","code":"c5u4m"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automation.trigger
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"target":"DEAL_57","code":"c5u4m","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automation.trigger
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.automation.trigger",
    		{
    			target: 'DEAL_57',
    			code: 'c5u4m',
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch(error)
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
                'crm.automation.trigger',
                [
                    'target' => 'DEAL_57',
                    'code'   => 'c5u4m',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error triggering automation: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.automation.trigger",
        {
            target: 'DEAL_57',
            code: 'c5u4m',
        },
        function(result) 
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.automation.trigger',
        [
            'target' => 'DEAL_57',
            'code' => 'c5u4m'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start":1718809827.810153,
        "finish":1718809828.541046,
        "duration":0.7308928966522217,
        "processing":0.09834408760070801,
        "date_start":"2024-06-19T15:10:27+00:00",
        "date_finish":"2024-06-19T15:10:28+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат активации триггера ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"",
    "error_description":"Target is not set."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Target is not set. | Не передали обязательный параметр `target` ||
|| Пустая строка | Incorrect target format. | Параметр `target` передан не в том формате, который нужен (Необходимый формат `TYPENAME_ID`) ||
|| Пустая строка | Target is not found. | В параметр `target` передали неправильный `TYPENAME` ||
|| `ACCESS_DENIED` | Access denied! There is no permissions to update the entity. | Пользователь, не прошёл проверку прав запуска триггера.  ||
|| Пустая строка | Access denied. | Пользователь не прошёл предварительную проверку прав на доступ к CRM ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./triggers/index.md)