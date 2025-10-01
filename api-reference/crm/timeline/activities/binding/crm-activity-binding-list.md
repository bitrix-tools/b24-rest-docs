# Получить список всех связей дела crm.activity.binding.list

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения элементов CRM

Метод `crm.activity.binding.list` получает список всех связей дела.

Метод вернет массив, элементами которого будут массивы, содержащие:

- `entityTypeId` — целочисленный идентификатор [типа объекта CRM](../../../data-types.md#object_type)
- `entityId` — целочисленный идентификатор элемента CRM

Результат будет содержать только элементы, к которым у текущего пользователя есть доступ на чтение.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **activityId***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор дела в таймлайне, например `999` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":999}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.binding.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":999,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.binding.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.activity.binding.list',
        {
          activityId: 999 // ID дела
        }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.activity.binding.list', { activityId: 999 }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.activity.binding.list', { activityId: 999 }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.binding.list',
                [
                    'activityId' => 999, // ID дела
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Результат: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.activity.binding.list',
        {
            activityId: 999 // ID дела
        },
        function(result) {
            if (result.error()) {
                console.error('Ошибка:', result.error()); 
            } else {
                console.log('Результат:', result.data()); 
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.binding.list',
        [
            'activityId' => 999 // ID дела
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
    "result":[
        {
            "entityTypeId": 1,
            "entityId": 123
        },
        {
            "entityTypeId": 2,
            "entityId": 456
        },
        {
            "entityTypeId": 3,
            "entityId": 789
        }
    ],
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../../data-types.md) | Результат операции. Возвращает массив, элементами которого будут массивы, содержащие:

- `entityTypeId` —  целочисленный идентификатор [типа объекта CRM](../../../data-types.md#object_type)
- `entityId` — целочисленный идентификатор элемента CRM
||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | Не переданы обязательные поля ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнении операции ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-activity-binding-add.md)
- [{#T}](./crm-activity-binding-delete.md)
- [{#T}](./crm-activity-binding-move.md)

