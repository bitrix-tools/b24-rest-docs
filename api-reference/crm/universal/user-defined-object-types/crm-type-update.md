# Обновить пользовательский тип crm.type.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом «Управление смарт-процессами» в настройках прав CRM. Для смарт-процессов цифрового рабочего места — администратор этого рабочего места или пользователь с таким же правом в нем

Метод `crm.type.update` обновляет существующий смарт-процесс по его идентификатору `id`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор смарт-процесса. Можно получить с помощью методов: [`crm.type.list`](./crm-type-list.md), [`crm.type.add`](./crm-type-add.md) ||
|| **fields**
[`object`](../../../data-types.md)  | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для обновления смарт-процесса ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **title** 
[`string`](../../../data-types.md)  | Название смарт-процесса. Пустое название недопустимо ||
|| **code**
[`string`](../../../data-types.md) | Символьный код смарт-процесса. Максимальная длина — 255 символов ||
|| **relations**
[`object`](../../../data-types.md)  | Объект, содержащий в себе связи с другими объектами CRM. Структура описана объектом [`type.relations`](../../data-types.md#typerelations). Для `isChildrenListEnabled` передавайте строку `"true"` или `"false"`: только `"true"` включает список, любое другое значение выключает. В ответе — `Y` или `N` ||
|| **isUseInUserfieldEnabled**
[`boolean`](../../../data-types.md) | Включено ли использование смарт-процесса в пользовательском поле ||
|| **linkedUserFields**       
[`object`](../../../data-types.md)  | Набор пользовательских полей, в которых должен отображаться смарт-процесс при включенном `isUseInUserfieldEnabled`. Структура описана объектом [`type.linkedUserFields`](../../data-types.md#typelinkeduserfields). Передавайте значения строками `"true"` или `"false"`: только `"true"` включает отображение, любое другое значение выключает. В ответе — `Y` или `N` ||
|| **isAutomationEnabled**    
[`boolean`](../../../data-types.md) | Включены ли роботы и триггеры ||
|| **isBeginCloseDatesEnabled**
[`boolean`](../../../data-types.md) | Включены ли поля **Дата начала** и **Дата завершения** ||
|| **isBizProcEnabled**       
[`boolean`](../../../data-types.md) | Включено ли использование дизайнера бизнес-процессов ||
|| **isCategoriesEnabled**    
[`boolean`](../../../data-types.md) | Включены ли свои воронки и туннели продаж. Отключить можно, только если у смарт-процесса меньше двух воронок ||
|| **isClientEnabled**        
[`boolean`](../../../data-types.md) | Включено ли поле **Клиент**. При включенной опции у смарт-процесса появляется предустановленная привязка к **Контактам** и **Компаниям** ||
|| **isDocumentsEnabled**     
[`boolean`](../../../data-types.md) | Включена ли печать документов ||
|| **isLinkWithProductsEnabled**
[`boolean`](../../../data-types.md) | Включена ли привязка товаров каталога ||
|| **isMycompanyEnabled**     
[`boolean`](../../../data-types.md) | Включено ли поле **Реквизиты вашей компании** ||
|| **isObserversEnabled**     
[`boolean`](../../../data-types.md) | Включено ли поле **Наблюдатели** ||
|| **isRecyclebinEnabled**    
[`boolean`](../../../data-types.md) | Включено ли использование корзины. Перед отключением удалите из корзины все элементы этого смарт-процесса ||
|| **isSetOpenPermissions**   
[`boolean`](../../../data-types.md) | Делать ли новые воронки доступными для всех ||
|| **isSourceEnabled**        
[`boolean`](../../../data-types.md) | Включены ли поля **Источник** и **Дополнительно об источнике** ||
|| **isStagesEnabled**        
[`boolean`](../../../data-types.md) | Включено ли использование своих стадий и канбана ||
|| **daysBeforeClose**
[`integer`](../../../data-types.md) | Сколько дней с момента создания отводится элементу до завершения: от `0` до `365`. Чтобы убрать срок, передайте `null` ||
|| **isRecurringEnabled**
[`boolean`](../../../data-types.md) | Включено ли поле **Регулярность** ||
|| **isMultifieldsEnabled**
[`boolean`](../../../data-types.md) | Включены ли поля коммуникаций: телефон, email и другие ||
|| **isPaymentsEnabled**
[`boolean`](../../../data-types.md) | Включен ли прием платежей ||
|| **isCountersEnabled**
[`boolean`](../../../data-types.md) | Включены ли режим просмотра «Дела» и счетчики ||
|| **isPersonEnabled**
[`boolean`](../../../data-types.md) | Включен ли учет людей. Включить можно только у смарт-процессов с готовой схемой данных, иначе метод вернет ошибку `BX_ERROR` ||
|| **isExternal**
[`boolean`](../../../data-types.md) | При обновлении игнорируется. Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) ||
|| **customSectionId**
[`integer`](../../../data-types.md) | Идентификатор цифрового рабочего места. Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) ||
|| **customSections**
[`array`](../../../data-types.md)   | Массив цифровых рабочих мест. Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) ||
|#

{% note info %}

Непереданные поля настроек смарт-процесса сохраняют свои значения.

Например, если у смарт-процесса с `id = 128` необходимо отключить функционал печати документов, то передаем следующие параметры:

```json
{
    "id": 128,
    "fields": {
        "isDocumentsEnabled": "N"
    }
}
```

{% endnote %}

### Связи

- Передавайте полный список связей для каждой изменяемой группы `parent` или `child`: переданный список заменяет существующие связи этой группы. Если группу не передать, ее связи не изменятся.
- Нельзя изменить настройки предустановленных связей (`isPredefined: "Y"`). Эти настройки можно не передавать в запросе.
- Если при сохранении связей возникла ошибка, метод возвращает ошибку. При этом поля смарт-процесса сохраняются до обработки связей.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. У смарт-процесса с `id = 20`:
    * Отключить следующие настройки:
        - Роботы и триггеры
        - Поля **Дата начала** и **Дата завершения**
        - Поле **Клиент**
        - Поле **Наблюдатели**
    * Включить следующие настройки:
        - Поля **Источник** и **Дополнительно об источнике**
        - Использование своих стадий и канбана
    * Включить отображение смарт-процесса в поле **Задачи**

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":20,"fields":{"isAutomationEnabled":"N","isBeginCloseDatesEnabled":"N","isClientEnabled":"N","isObserversEnabled":"N","isSourceEnabled":"Y","isStagesEnabled":"Y","isUseInUserfieldEnabled":"Y","linkedUserFields":{"TASKS_TASK|UF_CRM_TASK":"true"}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.type.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":20,"fields":{"isAutomationEnabled":"N","isBeginCloseDatesEnabled":"N","isClientEnabled":"N","isObserversEnabled":"N","isSourceEnabled":"Y","isStagesEnabled":"Y","isUseInUserfieldEnabled":"Y","linkedUserFields":{"TASKS_TASK|UF_CRM_TASK":"true"}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.type.update
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        type SmartProcessType = {
          id: number
          title: string
          entityTypeId: number
        }

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type TypeUpdateResult = {
          type: SmartProcessType
        }

        try {
          const response = await $b24.actions.v2.call.make<TypeUpdateResult>({
            method: 'crm.type.update',
            params: {
              id: 20,
              fields: {
                isAutomationEnabled: 'N',
                isBeginCloseDatesEnabled: 'N',
                isClientEnabled: 'N',
                isObserversEnabled: 'N',
                isSourceEnabled: 'Y',
                isStagesEnabled: 'Y',
                isUseInUserfieldEnabled: 'Y',
                linkedUserFields: {
                  'TASKS_TASK|UF_CRM_TASK': 'true',
                },
              },
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info(`Updated smart process #${result.type.id} (${result.type.title})`)
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
          async function updateSmartProcessSettings() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.type.update',
                params: {
                  id: 20,
                  fields: {
                    isAutomationEnabled: 'N',
                    isBeginCloseDatesEnabled: 'N',
                    isClientEnabled: 'N',
                    isObserversEnabled: 'N',
                    isSourceEnabled: 'Y',
                    isStagesEnabled: 'Y',
                    isUseInUserfieldEnabled: 'Y',
                    linkedUserFields: {
                      'TASKS_TASK|UF_CRM_TASK': 'true',
                    },
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
              console.info(`Updated smart process #${result.type.id} (${result.type.title})`)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', updateSmartProcessSettings)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.crm.type.update(
                bitrix_id=20,
                fields={
                    "isAutomationEnabled": "N",
                    "isBeginCloseDatesEnabled": "N",
                    "isClientEnabled": "N",
                    "isObserversEnabled": "N",
                    "isSourceEnabled": "Y",
                    "isStagesEnabled": "Y",
                    "isUseInUserfieldEnabled": "Y",
                    "linkedUserFields": {
                        "TASKS_TASK|UF_CRM_TASK": "true",
                    },
                },
            ).response
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
        require_once('crest.php');

        $result = CRest::call(
            'crm.type.update',
            [
                'id' => 20,
                'fields' => [
                    'isAutomationEnabled' => "N",
                    'isBeginCloseDatesEnabled' => "N",
                    'isClientEnabled' => "N",
                    'isObserversEnabled' => "N",
                    'isSourceEnabled' => "Y",
                    'isStagesEnabled' => "Y",
                    'isUseInUserfieldEnabled' => "Y",
                    'linkedUserFields' => [
                        "TASKS_TASK|UF_CRM_TASK" => "true",
                    ],
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Go

        ```go
        // client и ctx уже созданы — см. раздел «SDK для Go»
        res, err := client.Core().Call(ctx, "crm.type.update", b24.Params{
        	"id": 20,
        	"fields": b24.Params{
        		"isAutomationEnabled":      "N",
        		"isBeginCloseDatesEnabled": "N",
        		"isClientEnabled":          "N",
        		"isObserversEnabled":       "N",
        		"isSourceEnabled":          "Y",
        		"isStagesEnabled":          "Y",
        		"isUseInUserfieldEnabled":  "Y",
        		"linkedUserFields": b24.Params{
        			"TASKS_TASK|UF_CRM_TASK": "true",
        		},
        	},
        })
        if err != nil {
        	return fmt.Errorf("crm.type.update: %w", err)
        }

        // Ответ приходит как json.RawMessage — разберите его
        // в структуру под форму ответа, показанную ниже на этой странице.
        fmt.Printf("%s\n", res.Result)
        ```

    {% endlist %}

2. Допустим, у смарт-процесса с `id = 20` необходимо
    * Удалить все привязанные к смарт-процессу объекты (`relations.parent`)
    * Включить «показ в карточке» для `Лидов`, к которым привязан смарт-процесс

    Исходные **relations** в смарт-процессе:

    ```json
    {
        "relations": {
            "parent": [
                {
                    "entityTypeId": 31,
                    "isChildrenListEnabled": "N",
                    "isPredefined": "N"
                }
            ],
            "child": [
                {
                    "entityTypeId": 1,
                    "isChildrenListEnabled": "N",
                    "isPredefined": "N"
                },
                {
                    "entityTypeId": 2,
                    "isChildrenListEnabled": "N",
                    "isPredefined": "N"
                }
            ]
        }
    }
    ```

    **Итоговый запрос:**

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":20,"fields":{"relations":{"parent":[],"child":[{"entityTypeId":1,"isChildrenListEnabled":"true"},{"entityTypeId":2,"isChildrenListEnabled":"false"}]}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.type.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":20,"fields":{"relations":{"parent":[],"child":[{"entityTypeId":1,"isChildrenListEnabled":"true"},{"entityTypeId":2,"isChildrenListEnabled":"false"}]}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.type.update
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        type SmartProcessType = {
          id: number
          title: string
          entityTypeId: number
        }

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type TypeUpdateResult = {
          type: SmartProcessType
        }

        try {
          const response = await $b24.actions.v2.call.make<TypeUpdateResult>({
            method: 'crm.type.update',
            params: {
              id: 20,
              fields: {
                relations: {
                  parent: [],
                  child: [
                    {
                      entityTypeId: 1,
                      isChildrenListEnabled: 'true',
                    },
                    {
                      entityTypeId: 2,
                      isChildrenListEnabled: 'false',
                    },
                  ],
                },
              },
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info(`Updated smart process #${result.type.id} (${result.type.title})`)
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
          async function updateSmartProcessRelations() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.type.update',
                params: {
                  id: 20,
                  fields: {
                    relations: {
                      parent: [],
                      child: [
                        {
                          entityTypeId: 1,
                          isChildrenListEnabled: 'true',
                        },
                        {
                          entityTypeId: 2,
                          isChildrenListEnabled: 'false',
                        },
                      ],
                    },
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
              console.info(`Updated smart process #${result.type.id} (${result.type.title})`)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', updateSmartProcessRelations)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.crm.type.update(
                bitrix_id=20,
                fields={
                    "relations": {
                        "parent": [],
                        "child": [
                            {
                                "entityTypeId": 1,
                                "isChildrenListEnabled": "true",
                            },
                            {
                                "entityTypeId": 2,
                                "isChildrenListEnabled": "false",
                            },
                        ],
                    },
                },
            ).response
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
        require_once('crest.php');

        $result = CRest::call(
            'crm.type.update',
            [
                'id' => 20,
                'fields' => [
                    'relations' => [
                        'parent' => [],
                        'child' => [
                            [
                                "entityTypeId" => 1,
                                "isChildrenListEnabled" => "true",
                            ],
                            [
                                "entityTypeId" => 2,
                                "isChildrenListEnabled" => "false",
                            ]
                        ],
                    ],
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Go

        ```go
        // client и ctx уже созданы — см. раздел «SDK для Go»
        res, err := client.Core().Call(ctx, "crm.type.update", b24.Params{
        	"id": 20,
        	"fields": b24.Params{
        		"relations": b24.Params{
        			"parent": []any{},
        			"child": []b24.Params{
        				{
        					"entityTypeId":          1,
        					"isChildrenListEnabled": "true",
        				},
        				{
        					"entityTypeId":          2,
        					"isChildrenListEnabled": "false",
        				},
        			},
        		},
        	},
        })
        if err != nil {
        	return fmt.Errorf("crm.type.update: %w", err)
        }

        // Метод заворачивает ответ в объект с ключом "type".
        raw, ok := b24.Unwrap(res.Result, "type")
        if !ok {
        	return fmt.Errorf("в ответе нет ключа type")
        }

        var item struct {
        	ID                  b24.ID `json:"id"`
        	Title               string `json:"title"`
        	Code                string `json:"code"`
        	CreatedBy           int    `json:"createdBy"`
        	EntityTypeID        b24.ID `json:"entityTypeId"`
        	IsCategoriesEnabled string `json:"isCategoriesEnabled"`
        }
        if err := json.Unmarshal(raw, &item); err != nil {
        	return fmt.Errorf("разбор ответа: %w", err)
        }
        fmt.Println(item.ID, item.Title)
        ```

    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "type": {
            "id": 20,
            "title": "Смарт-процесс #3",
            "code": "",
            "createdBy": 1,
            "entityTypeId": 1222,
            "customSectionId": null,
            "isCategoriesEnabled": "Y",
            "isStagesEnabled": "Y",
            "isBeginCloseDatesEnabled": "N",
            "isClientEnabled": "N",
            "isUseInUserfieldEnabled": "Y",
            "isLinkWithProductsEnabled": "N",
            "isMycompanyEnabled": "Y",
            "isDocumentsEnabled": "N",
            "isSourceEnabled": "Y",
            "isObserversEnabled": "N",
            "isRecyclebinEnabled": "N",
            "isAutomationEnabled": "N",
            "isBizProcEnabled": "N",
            "isSetOpenPermissions": "Y",
            "isPaymentsEnabled": "N",
            "isCountersEnabled": "N",
            "createdTime": "2024-07-08T17:24:47+02:00",
            "updatedTime": "2024-07-09T20:55:37+02:00",
            "updatedBy": 1,
            "relations": {
                "parent": [],
                "child": [
                    {
                        "entityTypeId": 1,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    },
                    {
                        "entityTypeId": 2,
                        "isChildrenListEnabled": "N",
                        "isPredefined": "N"
                    }
                ]
            },
            "linkedUserFields": {
                "CALENDAR_EVENT|UF_CRM_CAL_EVENT": "N",
                "TASKS_TASK|UF_CRM_TASK": "Y",
                "TASKS_TASK_TEMPLATE|UF_CRM_TASK": "N"
            },
            "customSections": []
        }
    },
    "time": {
        "start": 1720551426.116454,
        "finish": 1720551426.816224,
        "duration": 0.6997702121734619,
        "processing": 0.20451998710632324,
        "date_start": "2024-07-09T20:57:06+02:00",
        "date_finish": "2024-07-09T20:57:06+02:00",
        "operating": 0.2044668197631836
    }
}
```

После изменения `linkedUserFields` ответ может содержать прежние значения этого поля. Чтобы получить сохраненные значения, вызовите [`crm.type.get`](./crm-type-get.md).

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит объект `type` ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`type`](../../data-types.md#type) | Информация об обновленном смарт-процессе ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | У пользователя нет прав, перечисленных в блоке «Кто может выполнять метод» ||
|| `403` | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям | Пользователь не является интранет-пользователем и не имеет прав администратора Битрикс24 ||
|| `400` | `UPDATE_DYNAMIC_TYPE_RESTRICTED` | Вы не можете изменить настройки смарт-процесса из-за ограничений вашего тарифа | Смарт-процессы недоступны на вашем тарифе ||
|| `400` | `0` | Смарт-процесс не найден | Смарт-процесс с указанным `id` не существует ||
|| `400` | `0` | Это смарт-процесс в рабочем месте, установленном из Витрины цифровых рабочих мест. Такие смарт-процессы нельзя добавить в другое рабочее место | Смарт-процесс связан с рабочим местом из Витрины, а переданный `customSectionId` отличается от текущего. Если не передавать `customSectionId`, остальные поля такого смарт-процесса можно изменить ||
|| `400` | `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле "Название" | Передано пустое название смарт-процесса ||
|| `400` | `BX_INVALID_VALUE` | Количество дней до завершения элемента смарт-процесса не должно превышать 365 или быть меньше 0 | Значение `daysBeforeClose` вне диапазона от `0` до `365` ||
|| `400` | `ADDRESS_BUSY` | Другое сохранение адреса пока не завершено, попробуйте ещё раз | Адрес раздела занят параллельной операцией при переносе смарт-процесса в раздел или добавлении раздела ||
|| `400` | `BX_ERROR` | Поля коммуникаций не получится включить: структура данных смарт-процесса не обновлена | Включение `isMultifieldsEnabled` отклонено, потому что схема данных смарт-процесса не готова. Обратитесь в техническую поддержку ||
|| `400` | `BX_ERROR` | Включить возможность учета людей можно только для пользовательских смарт-процессов с готовой схемой данных | Передан `isPersonEnabled = 'Y'` для смарт-процесса без готовой схемы данных ||
|| `400` | `BX_ERROR` | Воронки могут быть отключены, только если их меньше 2 | Попытка отключить воронки, когда у смарт-процесса их больше одной ||
|| `400` | `BX_ERROR` | Перед отключением корзины удалите из нее все элементы этого типа | Попытка отключить корзину, в которой есть элементы смарт-процесса ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../rest-v3/smart-process-types/crm-smart-process-update-rest-v3.md)
- [{#T}](./crm-type-add.md)
- [{#T}](./crm-type-get.md)
- [{#T}](./crm-type-get-by-entity-type-id.md)
- [{#T}](./crm-type-list.md)
- [{#T}](./crm-type-delete.md)
- [{#T}](./crm-type-fields.md)
- [{#T}](./index.md)
