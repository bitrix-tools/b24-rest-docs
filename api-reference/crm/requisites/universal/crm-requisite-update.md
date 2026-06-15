# Обновить реквизит crm.requisite.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет существующий реквизит.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор реквизита, можно получить методом [crm.requisite.list](./crm-requisite-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей реквизита — объект вида `"поле": "значение"[, ...]}`, значения которых нужно изменить ||
|#

## Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../../data-types.md) | Название реквизита ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ, используется для операций обмена.

Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор внешней информационной базы.

Назначение поля может меняться конечным разработчиком ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности.

Используются значения `Y` или `N`.

Сейчас поле фактически ни на что не влияет ||
|| **ADDRESS_ONLY**
[`char`](../../../data-types.md) | Признак состояния, когда реквизит используется только для хранения адреса.

Используются значения `Y` или `N`. При значении `Y` реквизиты не показываются в карточке сущности, но отображается адрес ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка.

Порядок в списке реквизитов сущности, когда их несколько ||
|| **RQ_NAME**
[`string`](../../../data-types.md) | ФИО ||
|| **RQ_FIRST_NAME**
[`string`](../../../data-types.md) | Имя ||
|| **RQ_LAST_NAME**
[`string`](../../../data-types.md) | Фамилия ||
|| **RQ_SECOND_NAME**
[`string`](../../../data-types.md) | Отчество ||
|| **RQ_COMPANY_ID**
[`string`](../../../data-types.md) | Идентификатор организации ||
|| **RQ_COMPANY_NAME**
[`string`](../../../data-types.md) | Сокращенное наименование организации ||
|| **RQ_COMPANY_FULL_NAME**
[`string`](../../../data-types.md) | Полное наименование организации ||
|| **RQ_COMPANY_REG_DATE**
[`string`](../../../data-types.md) | Дата государственной регистрации ||
|| **RQ_DIRECTOR**
[`string`](../../../data-types.md) | Генеральный директор ||
|| **RQ_ACCOUNTANT**
[`string`](../../../data-types.md) | Главный бухгалтер ||
|| **RQ_CEO_NAME**
[`string`](../../../data-types.md) | ФИО первого руководителя ||
|| **RQ_CEO_WORK_POS**
[`string`](../../../data-types.md) | Должность первого руководителя ||
|| **RQ_CONTACT**
[`string`](../../../data-types.md) | Контактное лицо ||
|| **RQ_EMAIL**
[`string`](../../../data-types.md) | E-Mail ||
|| **RQ_PHONE**
[`string`](../../../data-types.md) | Телефон ||
|| **RQ_FAX**
[`string`](../../../data-types.md) | Факс ||
|| **RQ_IDENT_TYPE**
[`crm_status`](../../../data-types.md) | Способ идентификации ||
|| **RQ_IDENT_DOC**
[`string`](../../../data-types.md) | Вид документа ||
|| **RQ_IDENT_DOC_SER**
[`string`](../../../data-types.md) | Серия ||
|| **RQ_IDENT_DOC_NUM**
[`string`](../../../data-types.md) | Номер ||
|| **RQ_IDENT_DOC_PERS_NUM**
[`string`](../../../data-types.md) | Личный номер ||
|| **RQ_IDENT_DOC_DATE**
[`string`](../../../data-types.md) | Дата выдачи ||
|| **RQ_IDENT_DOC_ISSUED_BY**
[`string`](../../../data-types.md) | Кем выдан ||
|| **RQ_IDENT_DOC_DEP_CODE**
[`string`](../../../data-types.md) | Код подразделения ||
|| **RQ_INN**
[`string`](../../../data-types.md) | ИНН ||
|| **RQ_KPP**
[`string`](../../../data-types.md) | КПП ||
|| **RQ_USRLE**
[`string`](../../../data-types.md) | Handelsregisternummer (для страны DE) ||
|| **RQ_IFNS**
[`string`](../../../data-types.md) | ИФНС ||
|| **RQ_OGRN**
[`string`](../../../data-types.md) | ОГРН ||
|| **RQ_OGRNIP**
[`string`](../../../data-types.md) | ОГРНИП ||
|| **RQ_OKPO**
[`string`](../../../data-types.md) | ОКПО ||
|| **RQ_OKTMO**
[`string`](../../../data-types.md) | ОКТМО ||
|| **RQ_OKVED**
[`string`](../../../data-types.md) | ОКВЭД ||
|| **RQ_EDRPOU**
[`string`](../../../data-types.md) | ЄДРПОУ ||
|| **RQ_DRFO**
[`string`](../../../data-types.md) | ДРФО ||
|| **RQ_KBE**
[`string`](../../../data-types.md) | КБЕ ||
|| **RQ_IIN**
[`string`](../../../data-types.md) | ИИН ||
|| **RQ_BIN**
[`string`](../../../data-types.md) | БИН ||
|| **RQ_ST_CERT_SER**
[`string`](../../../data-types.md) | Серия свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_NUM**
[`string`](../../../data-types.md) | Номер свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_DATE**
[`string`](../../../data-types.md) | Дата свидетельство о государственной регистрации ||
|| **RQ_VAT_PAYER**
[`char`](../../../data-types.md) | Платник ПДВ (для страны UA).

Используются значения `Y` или `N` ||
|| **RQ_VAT_ID**
[`string`](../../../data-types.md) | VAT ID (идентификационный номер (плательщика) НДС) ||
|| **RQ_VAT_CERT_SER**
[`string`](../../../data-types.md) | Серия свидетельства по НДС ||
|| **RQ_VAT_CERT_NUM**
[`string`](../../../data-types.md) | Номер свидетельства по НДС ||
|| **RQ_VAT_CERT_DATE**
[`string`](../../../data-types.md) | Дата свидетельства по НДС ||
|| **RQ_RESIDENCE_COUNTRY**
[`string`](../../../data-types.md) | Страна резидента ||
|| **RQ_BASE_DOC**
[`string`](../../../data-types.md) | Основание действия ||
|| **RQ_REGON**
[`string`](../../../data-types.md) | REGON (для страны PL) ||
|| **RQ_KRS**
[`string`](../../../data-types.md) | KRS (для страны PL) ||
|| **RQ_PESEL**
[`string`](../../../data-types.md) | PESEL (для страны PL) ||
|| **RQ_LEGAL_FORM**
[`string`](../../../data-types.md) | Forme juridique (для страны FR) ||
|| **RQ_SIRET**
[`string`](../../../data-types.md) | Numéro Siret (для страны FR) ||
|| **RQ_SIREN**
[`string`](../../../data-types.md) | Numéro Siren (для страны FR) ||
|| **RQ_CAPITAL**
[`string`](../../../data-types.md) | Capital social (для страны FR) ||
|| **RQ_RCS**
[`string`](../../../data-types.md) | RCS (для страны FR) ||
|| **RQ_CNPJ**
[`string`](../../../data-types.md) | CNPJ (для страны BR) ||
|| **RQ_STATE_REG**
[`string`](../../../data-types.md) | Inscrição Estadual (IE) (для страны BR) ||
|| **RQ_MNPL_REG**
[`string`](../../../data-types.md) | Inscrição Municipal (IM) (для страны BR) ||
|| **RQ_CPF**
[`string`](../../../data-types.md) | CPF (для страны BR) ||
|| **UF_CRM_...** | Пользовательские поля. Например, `UF_CRM_1694526604`.

У реквизитов может быть набор пользовательских полей с типами: `string`, `boolean`, `double`, `datetime`.

Добавить пользовательское поле реквизитов можно методом [crm.requisite.userfield.add](../user-fields/crm-requisite-userfield-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27,"fields":{"RQ_OKPO":"80715150","RQ_OKTMO":"45381000000","UF_CRM_1707997209":"78","UF_CRM_1708012333":"Категория 3"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27,"fields":{"RQ_OKPO":"80715150","RQ_OKTMO":"45381000000","UF_CRM_1707997209":"78","UF_CRM_1708012333":"Категория 3"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'crm.requisite.update',
        params: {
          id: 27,
          fields: {
            RQ_OKPO: '80715150',
            RQ_OKTMO: '45381000000',
            UF_CRM_1707997209: '78',
            UF_CRM_1708012333: 'Category 3',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Requisite updated:', result)
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
      async function updateRequisite() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.requisite.update',
            params: {
              id: 27,
              fields: {
                RQ_OKPO: '80715150',
                RQ_OKTMO: '45381000000',
                UF_CRM_1707997209: '78',
                UF_CRM_1708012333: 'Category 3',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Requisite updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateRequisite)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.update',
                [
                    'id' => 27,
                    'fields' => [
                        'RQ_OKPO'         => '80715150',
                        'RQ_OKTMO'        => '45381000000',
                        'UF_CRM_1707997209' => '78',
                        'UF_CRM_1708012333' => 'Категория 3',
                    ],
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
        echo 'Error updating requisite: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.update",
        {
            id: 27,
            fields:
            {
                "RQ_OKPO": "80715150",
                "RQ_OKTMO": "45381000000",
                "UF_CRM_1707997209": "78",
                "UF_CRM_1708012333": "Категория 3"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
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
        'crm.requisite.update',
        [
            'id' => 27,
            'fields' => [
                'RQ_OKPO' => '80715150',
                'RQ_OKTMO' => '45381000000',
                'UF_CRM_1707997209' => '78',
                'UF_CRM_1708012333' => 'Категория 3'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1717163055.335685,
        "finish": 1717163055.892722,
        "duration": 0.5570368766784668,
        "processing": 0.17116189002990723,
        "date_start": "2024-05-31T15:44:15+02:00",
        "date_finish": "2024-05-31T15:44:15+02:00",
        "operating": 0.17112517356872559
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Вовзращает значение:

- `true` — реквизит изменен
- `false` — реквизит не изменен

||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Ответ в случае ошибки

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The Requisite with ID '57' is not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Текст ошибки** | **Описание** ||
|| Пустая строка | The Requisite with ID '57' is not found | Реквизит с указанным идентификатором не найден ||
|| Пустая строка | ID is not defined or invalid. | Идентификатор реквизита не указан или имеет неопустимое значение ||
|| Пустая строка | ENTITY_TYPE_ID is not defined or invalid. | Идентификатор типа родительской сущности не указан или имеет недопустимое значение ||
|| Пустая строка | ENTITY_ID is not defined or invalid. | Идентификатор родительской сущности не указан или имеет недопустимое значение ||
|| Пустая строка | PRESET_ID is not defined or invalid. | Идентификатор шаблона реквизитов не указан или имеет недопустимое значение ||
|| Пустая строка | Access denied. | Недостаточно прав доступа для изменения реквизита ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-requisite-add.md)
- [{#T}](./crm-requisite-get.md)
- [{#T}](./crm-requisite-list.md)
- [{#T}](./crm-requisite-delete.md)
- [{#T}](./crm-requisite-fields.md)
