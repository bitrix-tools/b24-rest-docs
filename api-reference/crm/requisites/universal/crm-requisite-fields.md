# Получить поля реквизита crm.requisite.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.requisite.fields` возвращает описание системных и пользовательских полей реквизита.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.fields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldInfo = {
      type: string
      isRequired: boolean
      isReadOnly: boolean
      isImmutable: boolean
      isMultiple: boolean
      isDynamic: boolean
      title: string
      statusType?: string[]
      listLabel?: string
      formLabel?: string
      filterLabel?: string
      settings?: Record<string, unknown>
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type RequisiteFieldsResult = Record<string, FieldInfo>

    try {
      const response = await $b24.actions.v2.call.make<RequisiteFieldsResult>({
        method: 'crm.requisite.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(Object.keys(result).length, result)
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
      async function getRequisiteFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.requisite.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(Object.keys(result).length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getRequisiteFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.requisite.fields().response
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


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.fields',
                []
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
        echo 'Error fetching requisite fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "crm.requisite.fields",
        {},
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
        'crm.requisite.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.requisite.fields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.requisite.fields: %w", err)
    }

    keys, ok := b24.Keys(res.Result)
    if !ok {
    	return fmt.Errorf("ожидался объект в ответе")
    }
    fmt.Println("полей в ответе:", len(keys))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID"
        },
        "ENTITY_TYPE_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID типа сущности"
        },
        "ENTITY_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID сущности"
        },
        "PRESET_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID пресета"
        },
        "DATE_CREATE": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата создания"
        },
        "DATE_MODIFY": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата изменения"
        },
        "CREATED_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Создал"
        },
        "MODIFY_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Изменил"
        },
        "NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Название"
        },
        "CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Код"
        },
        "XML_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Внешний код"
        },
        "ORIGINATOR_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ORIGINATOR_ID"
        },
        "ACTIVE": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Активен"
        },
        "ADDRESS_ONLY": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ADDRESS_ONLY"
        },
        "SORT": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Сортировка"
        },
        "RQ_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Ф.И.О."
        },
        "RQ_FIRST_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Имя"
        },
        "RQ_LAST_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Фамилия"
        },
        "RQ_SECOND_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Отчество"
        },
        "RQ_COMPANY_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_COMPANY_ID"
        },
        "RQ_COMPANY_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Сокращенное наименование организации"
        },
        "RQ_COMPANY_FULL_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Полное наименование организации"
        },
        "RQ_COMPANY_REG_DATE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата государственной регистрации"
        },
        "RQ_DIRECTOR": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Ген. директор"
        },
        "RQ_ACCOUNTANT": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Гл. бухгалтер"
        },
        "RQ_CEO_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CEO_NAME"
        },
        "RQ_CEO_WORK_POS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CEO_WORK_POS"
        },
        "RQ_CONTACT": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Контактное лицо"
        },
        "RQ_EMAIL": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "E-Mail"
        },
        "RQ_PHONE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Телефон"
        },
        "RQ_FAX": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Факс"
        },
        "RQ_IDENT_TYPE": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": [
                "RQ_IDENT_TYPE_CO"
            ],
            "title": "RQ_IDENT_TYPE"
        },
        "RQ_IDENT_DOC": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Вид документа"
        },
        "RQ_IDENT_DOC_SER": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "серия"
        },
        "RQ_IDENT_DOC_NUM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "номер"
        },
        "RQ_IDENT_DOC_PERS_NUM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_IDENT_DOC_PERS_NUM"
        },
        "RQ_IDENT_DOC_DATE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "дата выдачи"
        },
        "RQ_IDENT_DOC_ISSUED_BY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "кем выдан"
        },
        "RQ_IDENT_DOC_DEP_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "код подразделения"
        },
        "RQ_INN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ИНН"
        },
        "RQ_KPP": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "КПП"
        },
        "RQ_USRLE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_USRLE"
        },
        "RQ_IFNS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ИФНС"
        },
        "RQ_OGRN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОГРН"
        },
        "RQ_OGRNIP": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОГРНИП"
        },
        "RQ_OKPO": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОКПО"
        },
        "RQ_OKTMO": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОКТМО"
        },
        "RQ_OKVED": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОКВЭД"
        },
        "RQ_EDRPOU": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_EDRPOU"
        },
        "RQ_DRFO": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_DRFO"
        },
        "RQ_KBE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_KBE"
        },
        "RQ_IIN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_IIN"
        },
        "RQ_BIN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_BIN"
        },
        "RQ_ST_CERT_SER": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Серия св. о гос. регистрации"
        },
        "RQ_ST_CERT_NUM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Номер св. о гос. регистрации"
        },
        "RQ_ST_CERT_DATE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата св. о гос. регистрации"
        },
        "RQ_VAT_PAYER": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_PAYER"
        },
        "RQ_VAT_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_ID"
        },
        "RQ_VAT_CERT_SER": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_CERT_SER"
        },
        "RQ_VAT_CERT_NUM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_CERT_NUM"
        },
        "RQ_VAT_CERT_DATE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_CERT_DATE"
        },
        "RQ_RESIDENCE_COUNTRY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_RESIDENCE_COUNTRY"
        },
        "RQ_BASE_DOC": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_BASE_DOC"
        },
        "RQ_REGON": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_REGON"
        },
        "RQ_KRS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_KRS"
        },
        "RQ_PESEL": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_PESEL"
        },
        "RQ_LEGAL_FORM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_LEGAL_FORM"
        },
        "RQ_SIRET": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_SIRET"
        },
        "RQ_SIREN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_SIREN"
        },
        "RQ_CAPITAL": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CAPITAL"
        },
        "RQ_RCS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_RCS"
        },
        "RQ_CNPJ": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CNPJ"
        },
        "RQ_STATE_REG": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_STATE_REG"
        },
        "RQ_MNPL_REG": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_MNPL_REG"
        },
        "RQ_CPF": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CPF"
        },
        "RQ_TAX_REGIME": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": [
                "RQ_TAX_REGIME_MX"
            ],
            "title": "RQ_TAX_REGIME"
        },
        "UF_CRM_1694526604": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1694526604",
            "listLabel": "ПП - Строка",
            "formLabel": "ПП - Строка",
            "filterLabel": "ПП - Строка",
            "settings": {
                "SIZE": 20,
                "ROWS": 1,
                "REGEXP": "",
                "MIN_LENGTH": 0,
                "MAX_LENGTH": 0,
                "DEFAULT_VALUE": null
            }
        },
        "UF_CRM_1707997209": {
            "type": "double",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1707997209",
            "listLabel": "ПП - Число",
            "formLabel": "ПП - Число",
            "filterLabel": "ПП - Число",
            "settings": {
                "PRECISION": 2,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            }
        },
        "UF_CRM_1707997236": {
            "type": "boolean",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1707997236",
            "listLabel": "ПП - Да/Нет",
            "formLabel": "ПП - Да/Нет",
            "filterLabel": "ПП - Да/Нет",
            "settings": {
                "DEFAULT_VALUE": 0,
                "DISPLAY": "CHECKBOX",
                "LABEL": [
                    "",
                    ""
                ],
                "LABEL_CHECKBOX": "ПП - Да/Нет"
            }
        },
        "UF_CRM_1707997253": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1707997253",
            "listLabel": "ПП - Дата",
            "formLabel": "ПП - Дата",
            "filterLabel": "ПП - Дата",
            "settings": {
                "DEFAULT_VALUE": {
                    "TYPE": "NONE",
                    "VALUE": ""
                },
                "USE_SECOND": "Y",
                "USE_TIMEZONE": "N"
            }
        }
    },
    "time": {
        "start": 1716902185.003805,
        "finish": 1716902185.379388,
        "duration": 0.3755831718444824,
        "processing": 0.016958951950073242,
        "date_start": "2024-05-28T15:16:25+02:00",
        "date_finish": "2024-05-28T15:16:25+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор [поля реквизита](#result-fields), а `value` — объект с [атрибутами поля](#attributes) ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Поля реквизита {#result-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор реквизита. Создается автоматически ||
|| **ENTITY_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа родительского объекта.

Сейчас это может быть только:
- `3` — контакт
- `4` — компания

Идентификаторы всех типов объектов CRM возвращает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md)

||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор родительского объекта (контакта либо компании).

Идентификатор можно получить методом [crm.company.list](../../companies/crm-company-list.md) для компании и методом [crm.contact.list](../../contacts/crm-contact-list.md) для контакта ||
|| **PRESET_ID**
[`integer`](../../../data-types.md) | Идентификатор шаблона реквизитов.

Идентификаторы шаблонов можно получить методом [crm.requisite.preset.list](../presets/crm-requisite-preset-list.md) ||
|| **DATE_CREATE**
[`datetime`](../../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../../data-types.md) | Дата изменения ||
|| **CREATED_BY_ID**
[`user`](../../../data-types.md) | Идентификатор создавшего реквизит ||
|| **MODIFY_BY_ID**
[`user`](../../../data-types.md) | Идентификатор изменившего реквизит ||
|| **NAME**
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

Значение по умолчанию — `Y`. Сейчас поле фактически ни на что не влияет ||
|| **ADDRESS_ONLY**
[`char`](../../../data-types.md) | Признак состояния, когда реквизит используется только для хранения адреса.

Используются значения `Y` или `N`. Значение по умолчанию — `N`.

При значении `Y` реквизиты не показываются в карточке объекта, но отображается адрес ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка.

Порядок в списке реквизитов объекта, когда их несколько. Значение по умолчанию — `500` ||
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
[`string`](../../../data-types.md) | Дата государственной регистрации в строковом формате, например `06.04.2007` ||
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
[`crm_status`](../../data-types.md) | Способ идентификации. Идентификаторы справочников для доступных стран находятся в атрибуте `statusType`. Чтобы получить значения справочника, передайте его идентификатор в `filter[ENTITY_ID]` метода [crm.status.list](../../status/crm-status-list.md) ||
|| **RQ_IDENT_DOC**
[`string`](../../../data-types.md) | Вид документа ||
|| **RQ_IDENT_DOC_SER**
[`string`](../../../data-types.md) | Серия ||
|| **RQ_IDENT_DOC_NUM**
[`string`](../../../data-types.md) | Номер ||
|| **RQ_IDENT_DOC_PERS_NUM**
[`string`](../../../data-types.md) | Личный номер ||
|| **RQ_IDENT_DOC_DATE**
[`string`](../../../data-types.md) | Дата выдачи в строковом формате, например `21.02.2015` ||
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
[`string`](../../../data-types.md) | Дата свидетельства о государственной регистрации ||
|| **RQ_VAT_PAYER**
[`char`](../../../data-types.md) | Платник ПДВ (для страны UA).

Используются значения `Y` или `N`. Значение по умолчанию — `N` ||
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
|| **RQ_TAX_REGIME**
[`crm_status`](../../data-types.md) | Налоговый режим для страны MX. Идентификатор справочника находится в атрибуте `statusType`. Чтобы получить значения справочника, передайте его идентификатор в `filter[ENTITY_ID]` метода [crm.status.list](../../status/crm-status-list.md) ||
|| **UF_CRM_...** | Пользовательские поля. Например, `UF_CRM_1694526604`.

У реквизитов может быть набор пользовательских полей с типами: `string`, `boolean`, `double`, `datetime`.

Добавить пользовательское поле реквизитов можно методом [crm.requisite.userfield.add](../user-fields/crm-requisite-userfield-add.md) ||
|#


#### Описание атрибутов {#attributes}

#|
|| **Название**
`тип` | **Описание** ||
|| type
[`string`](../../../data-types.md) | Тип поля ||
|| statusType
[`array`](../../../data-types.md) | Идентификаторы справочников для поля типа `crm_status`. Чтобы получить значения справочника, передайте его идентификатор в `filter[ENTITY_ID]` метода [crm.status.list](../../status/crm-status-list.md) ||
|| isRequired
[`boolean`](../../../data-types.md) | Атрибут «обязательное»
- `true` — да
- `false` — нет

||
|| isReadOnly
[`boolean`](../../../data-types.md) | Атрибут «только для чтения»
- `true` — да
- `false` — нет

||
|| isImmutable
[`boolean`](../../../data-types.md) | Атрибут «неизменяемое»
- `true` — да
- `false` — нет

||
|| isMultiple
[`boolean`](../../../data-types.md) | Атрибут «мультиполе»
- `true` — да
- `false` — нет

||
|| isDynamic
[`boolean`](../../../data-types.md) | Атрибут «пользовательское»
- `true` — да
- `false` — нет

||
|| title
[`string`](../../../data-types.md) | Идентификатор поля ||
|| listLabel
[`string`](../../../data-types.md) | Атрибут пользовательского поля. Содержит название поля в списках ||
|| formLabel
[`string`](../../../data-types.md) | Атрибут пользовательского поля. Содержит название поля в карточке ||
|| filterLabel
[`string`](../../../data-types.md) | Атрибут пользовательского поля. Содержит название поля в фильтре ||
|| settings
[`object`](../../../data-types.md) | Атрибут пользовательского поля. Объект со специфическими настройками для конкретного типа поля. Смотрите [пользовательские поля реквизитов](../user-fields/index.md) ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-requisite-add.md)
- [{#T}](./crm-requisite-update.md)
- [{#T}](./crm-requisite-get.md)
- [{#T}](./crm-requisite-list.md)
- [{#T}](./crm-requisite-delete.md)


