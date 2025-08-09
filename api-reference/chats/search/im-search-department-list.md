# Найти подразделения im.search.department.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.search.department.list` выполняет поиск подразделений.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **FIND^*^**
[`unknown`](../../data-types.md) | `Московский` | Поисковая фраза | 19 ||
|| **USER_DATA**
[`unknown`](../../data-types.md) | `N` | Подгружать данные о пользователях | 19 ||
|| **OFFSET**
[`unknown`](../../data-types.md) | `0` | Смещение выборки пользователей | 19 ||
|| **LIMIT**
[`unknown`](../../data-types.md) | `10` | Лимит выборки пользователей | 19 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

- Если передан параметр `USER_DATA = Y`, то к результату будут подгружены данные о руководителе.
- Поиск осуществляется по следующим полям: **Полное название подразделения**.
- Метод поддерживает стандартную постраничную навигацию Bitrix24 Rest Api, но в добавок к ней есть возможность построить навигацию с помощью параметров `OFFSET` и `LIMIT`.

## Примеры

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'im.search.department.list',
        {
          FIND: 'Московский'
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('im.search.department.list', { FIND: 'Московский' }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('im.search.department.list', { FIND: 'Московский' }, 0)
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
                'im.search.department.list',
                [
                    'FIND' => 'Московский'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'users: ' . print_r($result->data(), true);
        echo 'total: ' . $result->total();
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error searching department list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.search.department.list',
        {
            FIND: 'Московский'
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log('users', result.data());
                console.log('total', result.total());
            }
        }
    );
    ```

- PHP CRest

    ```php
    $result = restCommand(
        'im.search.department.list',
        Array(
            'FIND' => 'Московский'
        ),
        $_REQUEST[
            "auth"
        ]
    );    
    ```

- cURL

    // пример для cURL

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{    
    "result": [
        {
            "id": 51,
            "name": "Московский филиал",
            "full_name": "Московский филиал / Битрикс",
            "manager_user_id": 11
        }
    ],
    "total": 1
}            
```

### Описание ключей

- `id` – идентификатор подразделения
- `name` – краткое название подразделения
- `full_name` – полное название подразделения
- `manager_user_data` – объект описания данных руководителя (не доступно, если `USER_DATA != 'Y'`)
- `id` – идентификатор пользователя
- `name` – имя и фамилия пользователя
- `first_name` – имя пользователя
- `last_name` – фамилия пользователя
- `work_position` – должность
- `color` – цвет пользователя в формате hex
- `avatar` – ссылка на аватар (если пусто, значит аватар не задан)
- `gender` – пол пользователя
- `birthday` – день рождения пользователя в формате DD-MM, если пусто – не задан
- `extranet` – признак внешнего экстранет-пользователя (`true/false`)
- `network` – признак пользователя Битрикс24.Network (`true/false`)
- `bot` – признак бота (`true/false`)
- `connector` – признак пользователя открытых линий (`true/false`)
- `external_auth_id` – код внешней авторизации
- `status` – выбранный статус пользователя
- `idle` – дата, когда пользователь отошел от компьютера, в формате АТОМ (если не задано, `false`)
- `last_activity_date` – дата последнего действия пользователя в формате АТОМ
- `mobile_last_date` – дата последнего действия в мобильном приложении в формате АТОМ (если не задано, `false`)
- `absent` – дата, по какое число у пользователя отпуск, в формате АТОМ (если не задано, `false`)

## Ответ в случае ошибки

```json
{
    "error": "FIND_SHORT",
    "error_description": "Too short a search phrase."
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **FIND_SHORT** | Слишком короткая поисковая фраза, поиск осуществляется от трех символов. ||
|#