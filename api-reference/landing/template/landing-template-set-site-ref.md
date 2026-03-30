# Установить включаемые области для сайта landing.template.setSiteRef

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменение настроек» для сайта

Метод `landing.template.setSiteRef` сохраняет привязки включаемых областей для сайта. Он работает только с привязками сайта и не меняет привязки отдельных страниц.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить методом [landing.site.getList](../site/landing-site-get-list.md) ||
|| **data**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Набор привязок включаемых областей сайта [(подробное описание)](#data).

Если не передать параметр или передать пустой объект `{}` или массив `[]`, метод удалит все текущие привязки включаемых областей для этого сайта ||
|#

### Параметр data {#data}

#|
|| **Название**
`тип` | **Описание** ||
|| **<ID_ОБЛАСТИ>**
[`integer`](../../data-types.md) | Идентификатор страницы, которую нужно назначить в соответствующую включаемую область.

Ключом служит идентификатор области шаблона, значением — идентификатор страницы.

Идентификаторы областей зависят от шаблона сайта. Их можно определить по шаблону, например через метод [landing.template.getlist](./landing-template-get-list.md) и поле `CONTENT`: в разметке области обозначаются как `#AREA_1#`, `#AREA_2#` и так далее

В `data` нужно передавать только числовую часть такого идентификатора: `1`, `2`. Если для сохраненной области не передать ключ в `data` или передать для нее значение `0`, пустую строку, `null` либо отрицательное число, привязка будет удалена ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 157,
        "data": {
          "1": 614,
          "2": 615,
          "3": 616
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.template.setSiteRef.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 157,
        "data": {
          "1": 614,
          "2": 615,
          "3": 616
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.template.setSiteRef.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.template.setSiteRef',
            {
                id: 157,
                data: {
                    1: 614,
                    2: 615,
                    3: 616
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
                'landing.template.setSiteRef',
                [
                    'id' => 157,
                    'data' => [
                        1 => 614,
                        2 => 615,
                        3 => 616,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting site refs: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.template.setSiteRef',
        {
            id: 157,
            data: {
                1: 614,
                2: 615,
                3: 616
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
        'landing.template.setSiteRef',
        [
            'id' => 157,
            'data' => [
                1 => 614,
                2 => 615,
                3 => 616,
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
        "start": 1774893504,
        "finish": 1774893504.131602,
        "duration": 0.13160204887390137,
        "processing": 0,
        "date_start": "2026-03-30T20:58:24+03:00",
        "date_finish": "2026-03-30T20:58:24+03:00",
        "operating_reset_at": 1774894104,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат вызова.

Метод возвращает `true`, если запрос завершился без ошибки.

Метод может вернуть `true`, если ничего не изменилось. Например, когда для сайта уже сохранены такие же привязки, у пользователя нет права на изменение настроек или переданы только значения, которые не сохраняются ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ENTITY_NOT_FOUND",
    "error_description": "Сущность не найдена"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ENTITY_NOT_FOUND` | Сайт не найден или недоступен ||
|| `ACCESS_DENIED` | У пользователя нет прав на изменение настроек сайта ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-template-get-landing-ref.md)
- [{#T}](./landing-template-get-site-ref.md)
- [{#T}](./landing-template-get-list.md)
- [{#T}](./landing-template-set-landing-ref.md)
