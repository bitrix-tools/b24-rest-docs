# Удалить универсальный список lists.delete

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Полный доступ» для нужного списка

Метод `lists.delete` удаляет универсальный список. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп

Идентификатор можно получить с помощью метода [lists.get-iblock-type-id](./lists-get-iblock-type-id.md) ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":109}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":109,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.delete
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod(
          'lists.delete',
          {
            IBLOCK_TYPE_ID: 'lists',
            IBLOCK_ID: 109,
          }
      );
    
      const result = response.getData().result;
      console.log('Deleted list with ID:', result);
    
      processResult(result);
  } catch( error ) {
      console.error('Error:', error);
  }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'lists.delete',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => 109
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'lists.delete',
      {
         IBLOCK_TYPE_ID: 'lists',
         IBLOCK_ID: 109
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
        'lists.delete',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 109
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
        "start": 1764698473,
        "finish": 1764698473.663904,
        "duration": 0.6639039516448975,
        "processing": 0,
        "date_start": "2025-12-02T17:01:13+03:00",
        "date_finish": "2025-12-02T17:01:13+03:00",
        "operating_reset_at": 1764699073,
        "operating": 0.16965889930725098
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если список удален успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_IBLOCK_NOT_FOUND",
    "error_description":"Iblock not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_NOT_FOUND` | Iblock not found | Список с таким `IBLOCK_ID` или `IBLOCK_CODE` не найден ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для удаления списка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-add.md)
- [{#T}](./lists-update.md)
- [{#T}](./lists-get.md)
- [{#T}](./lists-get-iblock-type-id.md)