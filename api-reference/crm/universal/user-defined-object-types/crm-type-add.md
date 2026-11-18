# Создать новый пользовательский тип crm.type.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом «Управление смарт-процессами» в настройках прав CRM. Для смарт-процессов цифрового рабочего места — администратор этого рабочего места или пользователь с таким же правом в нем

Метод `crm.type.add` создает новый смарт-процесс.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип`         | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления нового смарт-процесса ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** | **По умолчанию** ||
|| **title***
[`string`](../../../data-types.md)  | Название смарт-процесса | ||
|| **code**
[`string`](../../../data-types.md) | Символьный код смарт-процесса. Максимальная длина — 255 символов | ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор создаваемого смарт-процесса. Если не передавать данное поле, то оно будет сгенерировано автоматически.

Стоит учитывать, что:
1. Параметр уникален
2. Значение `entityTypeId` обязано быть в одном из двух диапазонов:
   - четным целым числом, которое больше или равно 1030
   - целым числом от 128 до 191 включительно
| ||
|| **relations**
[`object`](../../../data-types.md)  | Объект, содержащий в себе связи с другими объектами CRM. Структура описана [ниже](#relations) | ||
|| **isUseInUserfieldEnabled** 
[`boolean`](../../../data-types.md) | Включено ли использование смарт-процесса в пользовательском поле | `N` ||
|| **linkedUserFields** 
[`object`](../../../data-types.md)  | Набор пользовательских полей, в которых должен отображаться смарт-процесс. Структура описана [ниже](#linkedUserFields) | `{}` ||
|| **isAutomationEnabled**
[`boolean`](../../../data-types.md) | Включены ли роботы и триггеры | `N` ||
|| **isBeginCloseDatesEnabled**
[`boolean`](../../../data-types.md) | Включены ли поля **Дата начала** и **Дата завершения** | `N` ||
|| **isBizProcEnabled**
[`boolean`](../../../data-types.md) | Включено ли использование дизайнера бизнес-процессов | `N` ||
|| **isCategoriesEnabled**
[`boolean`](../../../data-types.md) | Включены ли свои воронки и туннели продаж | `N` ||
|| **isClientEnabled**
[`boolean`](../../../data-types.md) | Включено ли поле **Клиент**. При включенной опции у смарт-процесса появляется предустановленная привязка к **Контактам** и **Компаниям** | `N` ||
|| **isDocumentsEnabled**
[`boolean`](../../../data-types.md) | Включена ли печать документов | `N` ||
|| **isLinkWithProductsEnabled**
[`boolean`](../../../data-types.md) | Включена ли привязка товаров каталога | `N` ||
|| **isMycompanyEnabled**
[`boolean`](../../../data-types.md) | Включено ли поле **Реквизиты вашей компании** | `N` ||
|| **isObserversEnabled** 
[`boolean`](../../../data-types.md) | Включено ли поле **Наблюдатели** | `N` ||
|| **isRecyclebinEnabled**
[`boolean`](../../../data-types.md) | Включено ли использование корзины | `N` ||
|| **isSetOpenPermissions** 
[`boolean`](../../../data-types.md) | Делать ли новые воронки доступными для всех | `Y` ||
|| **isSourceEnabled** 
[`boolean`](../../../data-types.md) | Включены ли поля **Источник** и **Дополнительно об источнике** | `N` ||
|| **isStagesEnabled**
[`boolean`](../../../data-types.md) | Включено ли использование своих стадий и канбана | `N` ||
|| **daysBeforeClose**
[`integer`](../../../data-types.md) | Сколько дней с момента создания отводится элементу до завершения: от `0` до `365`. Чтобы убрать срок, передайте `null` | `null` ||
|| **isRecurringEnabled**
[`boolean`](../../../data-types.md) | Включено ли поле **Регулярность** | `N` ||
|| **isMultifieldsEnabled**
[`boolean`](../../../data-types.md) | Включены ли поля коммуникаций: телефон, email и другие | `N` ||
|| **isPaymentsEnabled**
[`boolean`](../../../data-types.md) | Включен ли прием платежей | `N` ||
|| **isCountersEnabled**
[`boolean`](../../../data-types.md) | Включены ли режим просмотра «Дела» и счетчики | `N` ||
|| **isPersonEnabled**
[`boolean`](../../../data-types.md) | Включен ли учет людей. Включить можно только у смарт-процессов с готовой схемой данных, иначе метод вернет ошибку `BX_ERROR` | `N` ||
|| **isExternal**
[`string`](../../../data-types.md) | Является ли смарт-процесс вынесенным из CRM (привязанным к цифровому рабочему месту). Для включения передайте строку `"true"`

Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) | `-` ||
|| **customSectionId**
[`integer`](../../../data-types.md) | Идентификатор цифрового рабочего места

Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) | `-` ||
|| **customSections**
[`array`](../../../data-types.md) | Массив цифровых рабочих мест

Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) | `-` ||
|#

### Связи relations {#relations}

#|
|| **Название**
`тип` | **Описание** ||
|| **parent**
[`relation[]`](#relation) | Родительские типы CRM, к которым привязываются элементы смарт-процесса ||
|| **child**
[`relation[]`](#relation) | Дочерние типы CRM, элементы которых привязываются к смарт-процессу ||
|#

#### Одна связь relation {#relation}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** | **По умолчанию** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор [системного](../index.md) или [пользовательского типа](./index.md) объекта CRM | `-` ||
|| **isChildrenListEnabled**
[`string`](../../../data-types.md) | Показывать ли список дочерних элементов в карточке родительского элемента. Включается только строкой `"true"`; любое другое значение, включая `Y`, выключает. В ответе возвращается `Y` или `N` | `"false"` ||
|#

### Привязка к пользовательским полям {#linkedUserFields}

Настройка учитывается только при `isUseInUserfieldEnabled = 'Y'`.

#|
|| **Название**
`тип` | **Описание** | **Значение по умолчанию** ||
|| ```CALENDAR_EVENT|UF_CRM_CAL_EVENT```
[`string`](../../../data-types.md) | Событие в календаре | `"false"` ||
|| ```TASKS_TASK|UF_CRM_TASK```
[`string`](../../../data-types.md) | Задачи | `"false"` ||
|| ```TASKS_TASK_TEMPLATE|UF_CRM_TASK```
[`string`](../../../data-types.md) | Шаблоны задач | `"false"` ||
|#

Передавайте `"true"` для включения и `"false"` для выключения; любое значение, кроме строки `"true"`, выключает привязку. В ответе возвращается `Y` или `N`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Создадим смарт-процесс и настроим его:
* включим большинство настроек
* привяжем лиды, сделки и счета к смарт-процессу и добавим каждую привязку в карточку его элементов
* привяжем смарт-процесс к контактам и компаниям и добавим в карточку привязку к контактам
* включим отображение смарт-процесса в полях «Событие в календаре» и «Задачи»

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Смарт-процесс","entityTypeId":2024,"isAutomationEnabled":"Y","isBeginCloseDatesEnabled":"Y","isBizProcEnabled":"Y","isCategoriesEnabled":"Y","isClientEnabled":"Y","isDocumentsEnabled":"Y","isLinkWithProductsEnabled":"Y","isMycompanyEnabled":"Y","isObserversEnabled":"Y","isRecyclebinEnabled":"Y","isSetOpenPermissions":"Y","isSourceEnabled":"Y","isStagesEnabled":"Y","isUseInUserfieldEnabled":"Y","linkedUserFields":{"CALENDAR_EVENT|UF_CRM_CAL_EVENT":"true","TASKS_TASK|UF_CRM_TASK":"true"},"relations":{"parent":[{"entityTypeId":1,"isChildrenListEnabled":"true"},{"entityTypeId":2,"isChildrenListEnabled":"true"},{"entityTypeId":31,"isChildrenListEnabled":"true"}],"child":[{"entityTypeId":3,"isChildrenListEnabled":"true"},{"entityTypeId":4}]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.type.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Смарт-процесс","entityTypeId":2024,"isAutomationEnabled":"Y","isBeginCloseDatesEnabled":"Y","isBizProcEnabled":"Y","isCategoriesEnabled":"Y","isClientEnabled":"Y","isDocumentsEnabled":"Y","isLinkWithProductsEnabled":"Y","isMycompanyEnabled":"Y","isObserversEnabled":"Y","isRecyclebinEnabled":"Y","isSetOpenPermissions":"Y","isSourceEnabled":"Y","isStagesEnabled":"Y","isUseInUserfieldEnabled":"Y","linkedUserFields":{"CALENDAR_EVENT|UF_CRM_CAL_EVENT":"true","TASKS_TASK|UF_CRM_TASK":"true"},"relations":{"parent":[{"entityTypeId":1,"isChildrenListEnabled":"true"},{"entityTypeId":2,"isChildrenListEnabled":"true"},{"entityTypeId":31,"isChildrenListEnabled":"true"}],"child":[{"entityTypeId":3,"isChildrenListEnabled":"true"},{"entityTypeId":4}]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.type.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TypeResult = {
      type: {
        id: number,
        createdBy: number,
        entityTypeId: number,
        isCategoriesEnabled: string,
        isStagesEnabled: string,
        isBeginCloseDatesEnabled: string,
        isClientEnabled: string,
        isUseInUserfieldEnabled: string,
        isLinkWithProductsEnabled: string,
        isMycompanyEnabled: string,
        isDocumentsEnabled: string,
        isSourceEnabled: string,
        isObserversEnabled: string,
        isRecyclebinEnabled: string,
        isAutomationEnabled: string,
        isBizProcEnabled: string,
        isSetOpenPermissions: string,
        isPaymentsEnabled: string,
        isCountersEnabled: string,
        createdTime: ISODate,
        updatedTime: ISODate,
        updatedBy: number,
        title: string,
        relations: {
          parent: Array<{ entityTypeId: number, isChildrenListEnabled: string, isPredefined: string }>,
          child: Array<{ entityTypeId: number, isChildrenListEnabled: string, isPredefined: string }>,
        },
        linkedUserFields: Record<string, string>,
        customSections: unknown[],
        customSectionId: number | null,
      },
    }

    try {
      const response = await $b24.actions.v2.call.make<TypeResult>({
        method: 'crm.type.add',
        params: {
          fields: {
            title: "Смарт-процесс",
            entityTypeId: 2024,
            isAutomationEnabled: "Y",
            isBeginCloseDatesEnabled: "Y",
            isBizProcEnabled: "Y",
            isCategoriesEnabled: "Y",
            isClientEnabled: "Y",
            isDocumentsEnabled: "Y",
            isLinkWithProductsEnabled: "Y",
            isMycompanyEnabled: "Y",
            isObserversEnabled: "Y",
            isRecyclebinEnabled: "Y",
            isSetOpenPermissions: "Y",
            isSourceEnabled: "Y",
            isStagesEnabled: "Y",
            isUseInUserfieldEnabled: "Y",
            linkedUserFields: {
              "CALENDAR_EVENT|UF_CRM_CAL_EVENT": "true",
              "TASKS_TASK|UF_CRM_TASK": "true",
            },
            relations: {
              parent: [
                {
                  entityTypeId: 1,
                  isChildrenListEnabled: "true",
                },
                {
                  entityTypeId: 2,
                  isChildrenListEnabled: "true",
                },
                {
                  entityTypeId: 31,
                  isChildrenListEnabled: "true",
                },
              ],
              child: [
                {
                  entityTypeId: 3,
                  isChildrenListEnabled: "true",
                },
                {
                  entityTypeId: 4,
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
        console.info('Created smart process id:', result.type.id, 'entityTypeId:', result.type.entityTypeId)
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
      async function addCrmType() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.type.add',
            params: {
              fields: {
                title: "Смарт-процесс",
                entityTypeId: 2024,
                isAutomationEnabled: "Y",
                isBeginCloseDatesEnabled: "Y",
                isBizProcEnabled: "Y",
                isCategoriesEnabled: "Y",
                isClientEnabled: "Y",
                isDocumentsEnabled: "Y",
                isLinkWithProductsEnabled: "Y",
                isMycompanyEnabled: "Y",
                isObserversEnabled: "Y",
                isRecyclebinEnabled: "Y",
                isSetOpenPermissions: "Y",
                isSourceEnabled: "Y",
                isStagesEnabled: "Y",
                isUseInUserfieldEnabled: "Y",
                linkedUserFields: {
                  "CALENDAR_EVENT|UF_CRM_CAL_EVENT": "true",
                  "TASKS_TASK|UF_CRM_TASK": "true",
                },
                relations: {
                  parent: [
                    {
                      entityTypeId: 1,
                      isChildrenListEnabled: "true",
                    },
                    {
                      entityTypeId: 2,
                      isChildrenListEnabled: "true",
                    },
                    {
                      entityTypeId: 31,
                      isChildrenListEnabled: "true",
                    },
                  ],
                  child: [
                    {
                      entityTypeId: 3,
                      isChildrenListEnabled: "true",
                    },
                    {
                      entityTypeId: 4,
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
          console.info('Created smart process id:', result.type.id, 'entityTypeId:', result.type.entityTypeId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCrmType)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException
    try:
        bitrix_response = client.crm.type.add(fields={
            "title": "Смарт-процесс",
            "isCategoriesEnabled": "Y",
            "isStagesEnabled": "Y",
            "isClientEnabled": "Y",
            "isLinkWithProductsEnabled": "Y",
            "isMycompanyEnabled": "Y",
            "isDocumentsEnabled": "Y",
            "isAutomationEnabled": "Y",
            "isBizProcEnabled": "Y",
            "entityTypeId": 2024,
            "isBeginCloseDatesEnabled": "Y",
            "isObserversEnabled": "Y",
            "isRecyclebinEnabled": "Y",
            "isSetOpenPermissions": "Y",
            "isSourceEnabled": "Y",
            "isUseInUserfieldEnabled": "Y",
            "linkedUserFields": {
                "CALENDAR_EVENT|UF_CRM_CAL_EVENT": "true",
                "TASKS_TASK|UF_CRM_TASK": "true",
            },
            "relations": {
                "parent": [
                    {
                        "entityTypeId": 1,
                        "isChildrenListEnabled": "true",
                    },
                    {
                        "entityTypeId": 2,
                        "isChildrenListEnabled": "true",
                    },
                    {
                        "entityTypeId": 31,
                        "isChildrenListEnabled": "true",
                    },
                ],
                "child": [
                    {
                        "entityTypeId": 3,
                        "isChildrenListEnabled": "true",
                    },
                    {
                        "entityTypeId": 4,
                    },
                ],
            },
        }).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print('Ошибка Bitrix API', f'error: {error.error}', f'error_description: {error.error_description}', sep='\n')
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
                'crm.type.add',
                [
                    'fields' => [
                        'title'                     => "Смарт-процесс",
                        'entityTypeId'              => 2024,
                        'isAutomationEnabled'       => "Y",
                        'isBeginCloseDatesEnabled'  => "Y",
                        'isBizProcEnabled'          => "Y",
                        'isCategoriesEnabled'       => "Y",
                        'isClientEnabled'           => "Y",
                        'isDocumentsEnabled'        => "Y",
                        'isLinkWithProductsEnabled' => "Y",
                        'isMycompanyEnabled'        => "Y",
                        'isObserversEnabled'        => "Y",
                        'isRecyclebinEnabled'       => "Y",
                        'isSetOpenPermissions'      => "Y",
                        'isSourceEnabled'           => "Y",
                        'isStagesEnabled'           => "Y",
                        'isUseInUserfieldEnabled'   => "Y",
                        'linkedUserFields'          => [
                            "CALENDAR_EVENT|UF_CRM_CAL_EVENT" => "true",
                            "TASKS_TASK|UF_CRM_TASK"          => "true",
                        ],
                        'relations'                 => [
                            'parent' => [
                                [
                                    'entityTypeId'           => 1,
                                    'isChildrenListEnabled'  => "true",
                                ],
                                [
                                    'entityTypeId'           => 2,
                                    'isChildrenListEnabled'  => "true",
                                ],
                                [
                                    'entityTypeId'           => 31,
                                    'isChildrenListEnabled'  => "true",
                                ],
                            ],
                            'child'  => [
                                [
                                    'entityTypeId'           => 3,
                                    'isChildrenListEnabled'  => "true",
                                ],
                                [
                                    'entityTypeId'           => 4,
                                ],
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding CRM type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.type.add',
        {
            fields: {
                title: "Смарт-процесс",
                entityTypeId: 2024,
                isAutomationEnabled: "Y",
                isBeginCloseDatesEnabled: "Y",
                isBizProcEnabled: "Y",
                isCategoriesEnabled: "Y",
                isClientEnabled: "Y",
                isDocumentsEnabled: "Y",
                isLinkWithProductsEnabled: "Y",
                isMycompanyEnabled: "Y",
                isObserversEnabled: "Y",
                isRecyclebinEnabled: "Y",
                isSetOpenPermissions: "Y",
                isSourceEnabled: "Y",
                isStagesEnabled: "Y",
                isUseInUserfieldEnabled: "Y",
                linkedUserFields: {
                    "CALENDAR_EVENT|UF_CRM_CAL_EVENT": "true",
                    "TASKS_TASK|UF_CRM_TASK": "true",
                },
                relations: {
                    parent: [
                        {
                            entityTypeId: 1,
                            isChildrenListEnabled: "true",
                        },
                        {
                            entityTypeId: 2,
                            isChildrenListEnabled: "true",
                        },
                        {
                            entityTypeId: 31,
                            isChildrenListEnabled: "true",
                            
                        },
                    ],
                    child: [
                        {
                            entityTypeId: 3,
                            isChildrenListEnabled: "true",
                        },
                        {
                            entityTypeId: 4,
                        },
                    ],
                },
            },
        },
        (result) => {
            if (result.error())
            {
                console.error(result.error());

                return;
            }

            console.info(result.data());
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.type.add',
        [
            'fields' => [
                'title' => "Смарт-процесс",
                'entityTypeId' => 2024,
                'isAutomationEnabled' => "Y",
                'isBeginCloseDatesEnabled' => "Y",
                'isBizProcEnabled' => "Y",
                'isCategoriesEnabled' => "Y",
                'isClientEnabled' => "Y",
                'isDocumentsEnabled' => "Y",
                'isLinkWithProductsEnabled' => "Y",
                'isMycompanyEnabled' => "Y",
                'isObserversEnabled' => "Y",
                'isRecyclebinEnabled' => "Y",
                'isSetOpenPermissions' => "Y",
                'isSourceEnabled' => "Y",
                'isStagesEnabled' => "Y",
                'isUseInUserfieldEnabled' => "Y",
                'linkedUserFields' => [
                    "CALENDAR_EVENT|UF_CRM_CAL_EVENT" => "true",
                    "TASKS_TASK|UF_CRM_TASK" => "true",
                ],
                'relations' => [
                    'parent' => [
                        [
                            'entityTypeId' => 1,
                            'isChildrenListEnabled' => "true",
                        ],
                        [
                            'entityTypeId' => 2,
                            'isChildrenListEnabled' => "true",
                        ],
                        [
                            'entityTypeId' => 31,
                            'isChildrenListEnabled' => "true",
                        ],
                    ],
                    'child' => [
                        [
                            'entityTypeId' => 3,
                            'isChildrenListEnabled' => "true",
                        ],
                        [
                            'entityTypeId' => 4,
                        ],
                    ],
                ],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.type.add", b24.Params{
    	"fields": b24.Params{
    		"title":                     "Смарт-процесс",
    		"entityTypeId":              2024,
    		"isAutomationEnabled":       "Y",
    		"isBeginCloseDatesEnabled":  "Y",
    		"isBizProcEnabled":          "Y",
    		"isCategoriesEnabled":       "Y",
    		"isClientEnabled":           "Y",
    		"isDocumentsEnabled":        "Y",
    		"isLinkWithProductsEnabled": "Y",
    		"isMycompanyEnabled":        "Y",
    		"isObserversEnabled":        "Y",
    		"isRecyclebinEnabled":       "Y",
    		"isSetOpenPermissions":      "Y",
    		"isSourceEnabled":           "Y",
    		"isStagesEnabled":           "Y",
    		"isUseInUserfieldEnabled":   "Y",
    		"linkedUserFields": b24.Params{
    			"CALENDAR_EVENT|UF_CRM_CAL_EVENT": "true",
    			"TASKS_TASK|UF_CRM_TASK":          "true",
    		},
    		"relations": b24.Params{
    			"parent": []b24.Params{
    				{
    					"entityTypeId":          1,
    					"isChildrenListEnabled": "true",
    				},
    				{
    					"entityTypeId":          2,
    					"isChildrenListEnabled": "true",
    				},
    				{
    					"entityTypeId":          31,
    					"isChildrenListEnabled": "true",
    				},
    			},
    			"child": []b24.Params{
    				{
    					"entityTypeId":          3,
    					"isChildrenListEnabled": "true",
    				},
    				{
    					"entityTypeId": 4,
    				},
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.type.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "type".
    raw, ok := b24.Unwrap(res.Result, "type")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа type")
    }

    var item struct {
    	ID                       b24.ID `json:"id"`
    	CreatedBy                int    `json:"createdBy"`
    	EntityTypeID             b24.ID `json:"entityTypeId"`
    	IsCategoriesEnabled      string `json:"isCategoriesEnabled"`
    	IsStagesEnabled          string `json:"isStagesEnabled"`
    	IsBeginCloseDatesEnabled string `json:"isBeginCloseDatesEnabled"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.CreatedBy)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "type": {
            "id": 16,
            "createdBy": 1,
            "entityTypeId": 2024,
            "isCategoriesEnabled": "Y",
            "isStagesEnabled": "Y",
            "isBeginCloseDatesEnabled": "Y",
            "isClientEnabled": "Y",
            "isUseInUserfieldEnabled": "Y",
            "isLinkWithProductsEnabled": "Y",
            "isMycompanyEnabled": "Y",
            "isDocumentsEnabled": "Y",
            "isSourceEnabled": "Y",
            "isObserversEnabled": "Y",
            "isRecyclebinEnabled": "Y",
            "isAutomationEnabled": "Y",
            "isBizProcEnabled": "Y",
            "isSetOpenPermissions": "Y",
            "isPaymentsEnabled": "N",
            "isCountersEnabled": "N",
            "createdTime": "2024-07-05T19:47:33+02:00",
            "updatedTime": "2024-07-05T19:47:33+02:00",
            "updatedBy": 1,
            "title": "Смарт-процесс",
            "relations": {
                "parent": [
                    {
                        "entityTypeId": 3,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "Y"
                    },
                    {
                        "entityTypeId": 4,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "Y"
                    },
                    {
                        "entityTypeId": 1,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    },
                    {
                        "entityTypeId": 2,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    },
                    {
                        "entityTypeId": 31,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    }
                ],
                "child": [
                    {
                        "entityTypeId": 3,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    },
                    {
                        "entityTypeId": 4,
                        "isChildrenListEnabled": "N",
                        "isPredefined": "N"
                    }
                ]
            },
            "linkedUserFields": {
                "CALENDAR_EVENT|UF_CRM_CAL_EVENT": "N",
                "TASKS_TASK|UF_CRM_TASK": "N",
                "TASKS_TASK_TEMPLATE|UF_CRM_TASK": "N"
            },
            "customSections": [],
            "customSectionId": null
        }
    },
    "time": {
        "start": 1720201651.707909,
        "finish": 1720201654.748627,
        "duration": 3.040717840194702,
        "processing": 2.71589994430542,
        "date_start": "2024-07-05T19:47:31+02:00",
        "date_finish": "2024-07-05T19:47:34+02:00",
        "operating": 0
    }
}
```

В ответе `linkedUserFields` может содержать значения до сохранения привязок. Чтобы получить сохраненные значения, вызовите [crm.type.get](./crm-type-get.md).

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит единственный ключ `type` ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`type`](../../data-types.md#type) | Информация о созданном смарт-процессе ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "INVALID_ARG_VALUE", 
    "error_description": "entityTypeId is out of allowed range"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `INVALID_ARG_VALUE` | entityTypeId is out of allowed range | Передан `entityTypeId`, зарезервированный для системного типа на основе смарт-процессов ||
|| `400` | `BX_INVALID_VALUE` | EntityTypeId should be more or equal than 128 and less than 192 | Передан недопустимый `entityTypeId` ||
|| `400` | `BX_INVALID_VALUE` | Количество дней до завершения элемента смарт-процесса не должно превышать 365 или быть меньше 0 | Значение `daysBeforeClose` вне диапазона от `0` до `365` ||
|| `400` | `BX_ERROR` | Включить возможность учета людей можно только для пользовательских смарт-процессов с готовой схемой данных | Передан `isPersonEnabled = 'Y'` для смарт-процесса без готовой схемы данных ||
|| `400` | `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле "Название" | Не передано или передано пустое название смарт-процесса ||
|| `400` | `INVALID_ARG_VALUE` | customSectionId is invalid | Не найдено цифровое рабочее место с указанным `customSectionId` ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | У пользователя нет прав, перечисленных в блоке «Кто может выполнять метод» ||
|| `403` | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям | Возникает, если пользователь не является интранет-пользователем ||
|| `400` | `100` | `Could not find value for parameter {fields}` | Возникает, если не передан обязательный параметр `fields` ||
|| `400` | `0` | Выберите рабочее место, в котором будет находиться смарт-процесс | При передаче `isExternal = 'true'`, но пустом `customSectionId` ||
|| `400` | `CREATE_DYNAMIC_TYPE_RESTRICTED` | Превышено максимальное количество смарт-процессов | Создание смарт-процесса ограничено из-за тарифа ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-type-update.md)
- [{#T}](./crm-type-get.md)
- [{#T}](./crm-type-get-by-entity-type-id.md)
- [{#T}](./crm-type-list.md)
- [{#T}](./crm-type-delete.md)
- [{#T}](./crm-type-fields.md)
- [{#T}](./index.md)
