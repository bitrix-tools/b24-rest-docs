# Получить список соглашений userconsent.agreement.list

> Scope: [`userconsent`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `userconsent.agreement.list` возвращает список соглашений.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/userconsent.agreement.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userconsent.agreement.list
    ```

- JS

    ```js
    // callListMethod: Получает все данные сразу.
    // Используйте только для небольших выборок (< 1000 элементов) из-за высокой
    // нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'userconsent.agreement.list',
        {},
        (progress: number) => { console.log('Progress:', progress) }
    );
    const items = response.getData() || [];
    for (const entity of items) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора.
    // Используйте для больших объемов данных для эффективного потребления памяти.

    try {
    const generator = $b24.fetchListMethod('userconsent.agreement.list', {}, 'ID');
    for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
    }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start.
    // Используйте для точного контроля над пакетами запросов.
    // Для больших данных менее эффективен, чем fetchListMethod.

    try {
    const response = await $b24.callMethod('userconsent.agreement.list', {}, 0);
    const result = response.getData().result || [];
    for (const entity of result) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }
    ```
    
- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'userconsent.agreement.list',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching agreement list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'userconsent.agreement.list',
    {},
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
        'userconsent.agreement.list',
        []
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
"result": [
    {
     "ID": "35",
     "NAME": "Согласие на получение рассылки",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "ru"
    },
    {
     "ID": "33",
     "NAME": "Conditions d'utilisation de Bitrix24 Sites",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "fr"
    },
    {
     "ID": "31",
     "NAME": "Условия использования сервиса уведомлений",
     "ACTIVE": "Y",
     "LANGUAGE_ID": null
    },
    {
     "ID": "29",
     "NAME": "SASHA",
     "ACTIVE": "Y",
     "LANGUAGE_ID": ""
    },
    {
     "ID": "27",
     "NAME": "Условия использования Центра уведомлений Б24",
     "ACTIVE": "Y",
     "LANGUAGE_ID": null
    },
    {
     "ID": "25",
     "NAME": "Termos de Uso do Bitrix24 Sites",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "br"
    },
    {
     "ID": "23",
     "NAME": "Второе соглашение",
     "ACTIVE": "Y",
     "LANGUAGE_ID": ""
    },
    {
     "ID": "21",
     "NAME": "Bitrix24 Sites: Nutzungsbedingungen",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "de"
    },
    {
     "ID": "19",
     "NAME": "Согласие с Cookies-файлами",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "ru"
    },
    {
     "ID": "17",
     "NAME": "Cookie consent",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "en"
    },
    {
     "ID": "15",
     "NAME": "Правила використання Бітрікс24.Сайти",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "ua"
    },
    {
     "ID": "13",
     "NAME": "Test newwef",
     "ACTIVE": "Y",
     "LANGUAGE_ID": ""
    },
    {
     "ID": "11",
     "NAME": "Bitrix24 Sites Terms of Use",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "en"
    },
    {
     "ID": "9",
     "NAME": "Правила использования Битрикс24.Сайты",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "es"
    },
    {
     "ID": "7",
     "NAME": "Правила использования Битрикс24.Сайты",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "ru"
    },
    {
     "ID": "1",
     "NAME": "Пример согласия на обработку персональных данных",
     "ACTIVE": "Y",
     "LANGUAGE_ID": ""
    }
],
"time": {
    "start": 1760352862,
    "finish": 1760352862.776508,
    "duration": 0.776508092880249,
    "processing": 0,
    "date_start": "2025-10-13T13:54:22+03:00",
    "date_finish": "2025-10-13T13:54:22+03:00",
    "operating_reset_at": 1760353462,
    "operating": 0
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Корневой элемент ответа ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор соглашения ||
|| **NAME**
[`string`](../data-types.md) | Название соглашения ||
|| **ACTIVE**
[`string`](../data-types.md) | Признак активности. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **LANGUAGE_ID**
[`string`](../data-types.md) | Идентификатор языка соглашения ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-consent-agreement-text.md)
- [{#T}](./user-consent-consent-add.md)