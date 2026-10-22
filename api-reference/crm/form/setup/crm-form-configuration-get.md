# Получить конфигурацию конструктора CRM-форм crm.form.configuration.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр CRM-форм

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.form.configuration.get` возвращает справочники и настройки Битрикс24, которые нужны для сборки CRM-формы.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.configuration.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.configuration.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.configuration.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type NamedId = { id: number, name: string }
    type NamedCode = { id: string, name: string }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormConfigurationResult = {
      item: {
        entitySchemes: Array<{
          id: number
          name: string
          description: string
          entityNames: string[]
          mainEntityName: string | null
          hasInvoice: boolean
          dynamic: boolean
        }>
        duplicateModes: NamedCode[]
        lead: { enabled: boolean }
        dealCategories: NamedId[]
        smartProcesses: Array<{
          entityTypeId: number
          entityName: string
          name: string
          categories: NamedId[]
        }>
        languages: NamedCode[]
        currencies: Array<{ id: string, fullName: string, formatString: string }>
        fieldTypes: Array<{ id: string, name: string, parameters: string[] }>
        paySystems: NamedId[]
        permissions: { canRead: boolean, canEdit: boolean }
        limits: { activeForms: { current: number, maximum: number } | null }
        product: { isCloud: boolean, isRegionRussian: boolean }
        region: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<FormConfigurationResult>({
        method: 'crm.form.configuration.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item.entitySchemes)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getFormConfiguration() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.configuration.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item.entitySchemes)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFormConfiguration)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.form.configuration.get().response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.form.configuration.get',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'crm.form.configuration.get',
        {},
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.form.configuration.get',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.form.configuration.get", b24.Params{}, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.configuration.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	EntitySchemes []struct {
    		ID          int      `json:"id"`
    		Name        string   `json:"name"`
    		EntityNames []string `json:"entityNames"`
    	} `json:"entitySchemes"`
    	Limits struct {
    		ActiveForms *struct {
    			Current int `json:"current"`
    			Maximum int `json:"maximum"`
    		} `json:"activeForms"`
    	} `json:"limits"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(len(item.EntitySchemes))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Пример сокращен: в массивах оставлено по несколько элементов.

```json
{
    "result": {
        "item": {
            "entitySchemes": [
                {
                    "id": 1,
                    "name": "Лид",
                    "description": "лид",
                    "entityNames": ["LEAD", "COMPANY", "CONTACT"],
                    "mainEntityName": "LEAD",
                    "hasInvoice": false,
                    "dynamic": false
                },
                {
                    "id": 2,
                    "name": "Клиент",
                    "description": "контакт или компания",
                    "entityNames": ["CONTACT", "COMPANY"],
                    "mainEntityName": null,
                    "hasInvoice": false,
                    "dynamic": false
                },
                {
                    "id": 3,
                    "name": "Сделка",
                    "description": "сделка, контакт или компания",
                    "entityNames": ["DEAL", "COMPANY", "CONTACT"],
                    "mainEntityName": "DEAL",
                    "hasInvoice": false,
                    "dynamic": false
                },
                {
                    "id": 1770,
                    "name": "Закупка оборудования",
                    "description": "Смарт-процесс, контакт или компания",
                    "entityNames": ["DYNAMIC_177", "COMPANY", "CONTACT"],
                    "mainEntityName": "DYNAMIC_177",
                    "hasInvoice": false,
                    "dynamic": true
                }
            ],
            "duplicateModes": [
                {
                    "id": "MERGE",
                    "name": "Объединять"
                },
                {
                    "id": "REPLACE",
                    "name": "Заменять"
                }
            ],
            "lead": {
                "enabled": true
            },
            "dealCategories": [
                {
                    "id": 0,
                    "name": "Общая"
                },
                {
                    "id": 1,
                    "name": "Newest"
                }
            ],
            "smartProcesses": [
                {
                    "entityTypeId": 177,
                    "entityName": "DYNAMIC_177",
                    "name": "Закупка оборудования",
                    "categories": [
                        {
                            "id": 7,
                            "name": "Общее"
                        },
                        {
                            "id": 9,
                            "name": "Вторая воронка"
                        }
                    ]
                }
            ],
            "languages": [
                {
                    "id": "en",
                    "name": "English"
                },
                {
                    "id": "ru",
                    "name": "Русский"
                }
            ],
            "currencies": [
                {
                    "id": "RUB",
                    "fullName": "руб.",
                    "formatString": "# &#8381;"
                }
            ],
            "fieldTypes": [
                {
                    "id": "section",
                    "name": "Раздел",
                    "parameters": ["label"]
                },
                {
                    "id": "phone",
                    "name": "Телефон",
                    "parameters": ["label", "required", "multiple", "placeholder", "valueType", "value"]
                },
                {
                    "id": "hr",
                    "name": "Разрыв строки",
                    "parameters": []
                }
            ],
            "paySystems": [
                {
                    "id": 11,
                    "name": "Наличные"
                },
                {
                    "id": 31,
                    "name": "Оплата картой"
                }
            ],
            "permissions": {
                "canRead": true,
                "canEdit": true
            },
            "limits": {
                "activeForms": {
                    "current": 4,
                    "maximum": 99999
                }
            },
            "product": {
                "isCloud": true,
                "isRegionRussian": true
            },
            "region": "ru"
        }
    },
    "time": {
        "start": 1792593640,
        "finish": 1792593640.689641,
        "duration": 0.689640998840332,
        "processing": 0,
        "date_start": "2026-10-21T17:40:40+03:00",
        "date_finish": "2026-10-21T17:40:40+03:00",
        "operating_reset_at": 1792593600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../../data-types.md) | Объект с конфигурацией конструктора форм [(подробное описание)](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **entitySchemes**
[`object[]`](../../../data-types.md) | Схемы создания объектов CRM: какие объекты создает заполненная форма [(подробное описание)](#entity-schemes).

Идентификатор схемы передается в поле `crm.entityScheme` при создании и изменении формы ||
|| **duplicateModes**
[`object[]`](../../../data-types.md) | Режимы обработки повторного заполнения формы: элементы с полями `id` и `name`.

Значение `id` передается в поле `crm.duplicateMode`. На тестовом Битрикс24 возвращаются `MERGE` — объединять и `REPLACE` — заменять ||
|| **lead**
[`object`](../../../data-types.md) | Объект с полем `enabled` типа `boolean`:
- `true` — в CRM включены лиды
- `false` — CRM работает в простом режиме без лидов ||
|| **dealCategories**
[`object[]`](../../../data-types.md) | Воронки сделок: элементы с полями `id` и `name`.

Значение `id` передается в поле `crm.dealCategoryId`. Общая воронка имеет идентификатор `0` ||
|| **smartProcesses**
[`object[]`](../../../data-types.md) | Смарт-процессы, элементы которых может создавать форма [(подробное описание)](#smart-processes) ||
|| **languages**
[`object[]`](../../../data-types.md) | Языки формы: элементы с полями `id` и `name`.

Значение `id` передается в поле `languageId` ||
|| **currencies**
[`object[]`](../../../data-types.md) | Валюты Битрикс24 [(подробное описание)](#currencies) ||
|| **fieldTypes**
[`object[]`](../../../data-types.md) | Типы полей, из которых можно собрать форму [(подробное описание)](#field-types).

Значение `id` передается в поле `fields[].type` ||
|| **paySystems**
[`object[]`](../../../data-types.md) | Платежные системы, через которые можно оплатить заполненную форму: элементы с полями `id` и `name`.

Идентификаторы систем, которые форма не должна предлагать, передаются в поле `payment.disabledPaySystemsId`. Если на Битрикс24 нет модуля `sale`, массив пустой ||
|| **permissions**
[`object`](../../../data-types.md) | Права текущего пользователя на CRM-формы:
- `canRead` — может просматривать формы
- `canEdit` — может создавать, изменять и удалять формы ||
|| **limits**
[`object`](../../../data-types.md) | Объект с полем `activeForms` — лимит активных форм:
- `current` — сколько форм сейчас активно
- `maximum` — сколько форм можно держать активными на тарифе

Если количество активных форм на Битрикс24 не ограничено, `activeForms` равно `null` ||
|| **product**
[`object`](../../../data-types.md) | Сведения о продукте:
- `isCloud` — облачный Битрикс24
- `isRegionRussian` — Битрикс24 российского региона ||
|| **region**
[`string`](../../../data-types.md) | Код региона Битрикс24, например `ru` ||
|#

#### Элемент entitySchemes {#entity-schemes}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор схемы ||
|| **name**
[`string`](../../../data-types.md) | Название схемы ||
|| **description**
[`string`](../../../data-types.md) | Описание схемы: какие объекты она создает ||
|| **entityNames**
[`string[]`](../../../data-types.md) | Коды объектов CRM, которые создает схема, например `LEAD`, `CONTACT`, `COMPANY`, `DYNAMIC_174`.

Коды передаются в фильтр метода [crm.form.entityfield.list](./crm-form-entityfield-list.md), чтобы получить поля для формы ||
|| **mainEntityName**
[`string`](../../../data-types.md) | Код основного объекта схемы. Для схемы «Клиент» — `null` ||
|| **hasInvoice**
[`boolean`](../../../data-types.md) | Признак того, что схема создает счет ||
|| **dynamic**
[`boolean`](../../../data-types.md) | Признак схемы смарт-процесса ||
|#

#### Элемент smartProcesses {#smart-processes}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа смарт-процесса ||
|| **entityName**
[`string`](../../../data-types.md) | Код смарт-процесса, например `DYNAMIC_177` ||
|| **name**
[`string`](../../../data-types.md) | Название смарт-процесса ||
|| **categories**
[`object[]`](../../../data-types.md) | Воронки смарт-процесса: элементы с полями `id` и `name`.

Значение `id` передается в поле `crm.smartProcessCategoryId` ||
|#

#### Элемент currencies {#currencies}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Код валюты, например `RUB` ||
|| **fullName**
[`string`](../../../data-types.md) | Название валюты ||
|| **formatString**
[`string`](../../../data-types.md) | Шаблон вывода суммы, `#` заменяется суммой ||
|#

#### Элемент fieldTypes {#field-types}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Код типа поля формы, например `string`, `phone`, `email`, `section`, `hr` ||
|| **name**
[`string`](../../../data-types.md) | Название типа поля ||
|| **parameters**
[`string[]`](../../../data-types.md) | Параметры, которые можно задать полю этого типа в элементе `fields[]`, например `label`, `required`, `multiple`, `placeholder`, `valueType`, `value`. Для разделителей `hr` и `br` массив пустой ||
|#

{% note info "" %}

В справочнике `fieldTypes` нет типов полей с вариантами выбора: список, флажки, переключатели. Через REST такие поля, а также товары и бронирование в форму пока добавить нельзя.

{% endnote %}

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION",
        "message": "Доступ запрещен"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Выдайте пользователю право на просмотр CRM-форм ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-entityfield-list.md)
- [{#T}](./crm-form-scenario-list.md)
- [{#T}](../crm-form-add.md)
- [{#T}](./crm-form-configuration-field-list.md)
- [{#T}](./index.md)
