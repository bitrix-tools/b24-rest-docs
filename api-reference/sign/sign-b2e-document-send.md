# Отправить документ на подписание sign.b2e.document.send

> Scope: [`sign.b2e`](../scopes/permissions.md), [`crm`](../scopes/permissions.md), [`humanresources.hcmlink`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом создавать документы КЭДО

Метод `sign.b2e.document.send` отправляет документ на подписание со стороны компании.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields*** 
[`object`](../data-types.md) | Параметры отправки документа на подписание [(подробное описание)](#fields) ||
|| **language**
[`string`](../data-types.md) | Язык локализации статусов в ответе.

По умолчанию `en` ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **company*** 
[`object`](../data-types.md) | Компания, от имени которой отправляется документ [(подробное описание)](#company) ||
|| **members*** 
[`array`](../data-types.md) | Список участников подписания. Должен содержать минимум одного участника с ролью `signer` и одного с ролью `assignee` [(подробное описание)](#members) ||
|| **responsible*** 
[`object`](../data-types.md) | Ответственный за документ [(подробное описание)](#responsible) ||
|| **companyProviderUid*** 
[`string`](../data-types.md) | Идентификатор провайдера подписи. Получить список доступных провайдеров подписи можно методом [sign.b2e.company.provider.list](./sign-b2e-company-provider-list.md) ||
|| **files*** 
[`array`](../data-types.md) | Файл подписываемого документа [(подробное описание)](#files) ||
|| **regionDocumentType*** 
[`string`](../data-types.md) | Тип документа для региона [(подробное описание)](#region-document-type) ||
|| **externalSettings*** 
[`object`](../data-types.md) | Внешние параметры документа [(подробное описание)](#external-settings) ||
|| **language**
[`string`](../data-types.md) | Язык документа ||
|#

### Параметр company {#company}

#|
|| **Название**
`тип` | **Описание** ||
|| **uuid*** 
[`string`](../data-types.md) | UUID компании в HCM Link ||
|| **crmId*** 
[`integer`](../data-types.md) | Идентификатор компании в CRM, подключенный в интеграции как «моя компания» ||
|#

Передайте один из параметров `uuid` или `crmId`.

### Элемент массива members {#members}

#|
|| **Название**
`тип` | **Описание** ||
|| **employeeCode***
[`string`](../data-types.md) | Код сотрудника в HCM Link ||
|| **employeeId***
[`integer`](../data-types.md) | Идентификатор сотрудника в HCM Link ||
|| **userId***
[`integer`](../data-types.md) | Идентификатор пользователя в Битрикс24 ||
|| **role*** 
[`string`](../data-types.md) | Роль участника. Возможные значения: 
- `signer` — подписант, 
- `assignee` — представитель компании, 
- `reviewer` — согласующий, 
- `editor` — редактор ||
|#

Передайте один из параметров `employeeId`, `employeeCode` или `userId`.

### Параметр responsible {#responsible}

#|
|| **Название**
`тип` | **Описание** ||
|| **employeeCode***
[`string`](../data-types.md) | Код сотрудника в HCM Link ||
|| **employeeId***
[`integer`](../data-types.md) | Идентификатор сотрудника в HCM Link ||
|| **userId***
[`integer`](../data-types.md) | Идентификатор пользователя в Битрикс24 ||
|| **role**
[`string`](../data-types.md) | Роль участника. Возможные значения:
- `signer` — подписант, 
- `assignee` — представитель компании, значение по умолчанию
- `reviewer` — согласующий, 
- `editor` — редактор ||
|#

Передайте один из параметров `employeeId`, `employeeCode` или `userId`.

### Элемент массива files {#files}

#|
|| **Название**
`тип` | **Описание** ||
|| **fileName*** 
[`string`](../data-types.md) | Имя файла. Обязательно с расширением `.pdf` ||
|| **fileType*** 
[`string`](../data-types.md) | MIME-тип файла. Поддерживается `application/pdf` ||
|| **fileContent*** 
[`string`](../data-types.md) | Содержимое файла, закодированное в Base64 ||
|#

### Параметр regionDocumentType {#region-document-type}

Код типа документа зависит от региона лицензии. Список доступных кодов формируется на стороне Битрикс24 и валидация выполняется по региону портала.

Если вы не знаете код, используйте значение `12.999` как безопасное значение по умолчанию. Это значение проходит проверку по умолчанию, когда список кодов для региона пустой или неизвестен.

### Параметр externalSettings {#external-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **externalId*** 
[`string`](../data-types.md) | Внешний идентификатор. Максимальная длина — 255 символов ||
|| **externalDateCreate*** 
[`string`](../data-types.md) | Дата создания внешнего документа в формате ISO 8601 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"company":{"crmId":12},"members":[{"userId":25,"role":"signer"},{"userId":42,"role":"assignee"}],"responsible":{"userId":7},"companyProviderUid":"d4f6b8a1-4c6d-4d8c-9c7c-2d1b1f6d0f2b","files":[{"fileName":"contract.pdf","fileType":"application/pdf","fileContent":"JVBERi0xLjQKJ..."}],"regionDocumentType":"12.999","externalSettings":{"externalId":"EXT-123","externalDateCreate":"2025-02-18T09:19:34+03:00"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.document.send
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sign.b2e.document.send',
    		{
    			fields: {
    				company: { crmId: 12 },
    				members: [
    					{ userId: 25, role: 'signer' },
    					{ userId: 42, role: 'assignee' }
    				],
    				responsible: { userId: 7 },
    				companyProviderUid: 'd4f6b8a1-4c6d-4d8c-9c7c-2d1b1f6d0f2b',
    				files: [
    					{
    						fileName: 'contract.pdf',
    						fileType: 'application/pdf',
    						fileContent: 'JVBERi0xLjQKJ...'
    					}
    				],
    				regionDocumentType: '12.999',
    				externalSettings: {
    					externalId: 'EXT-123',
    					externalDateCreate: '2025-02-18T09:19:34+03:00'
    				}
    			}
    		}
    	);
    
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
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
                'sign.b2e.document.send',
                [
                    'fields' => [
                        'company' => [
                            'crmId' => 12
                        ],
                        'members' => [
                            [ 'userId' => 25, 'role' => 'signer' ],
                            [ 'userId' => 42, 'role' => 'assignee' ]
                        ],
                        'responsible' => [ 'userId' => 7 ],
                        'companyProviderUid' => 'd4f6b8a1-4c6d-4d8c-9c7c-2d1b1f6d0f2b',
                        'files' => [
                            [
                                'fileName' => 'contract.pdf',
                                'fileType' => 'application/pdf',
                                'fileContent' => 'JVBERi0xLjQKJ...'
                            ]
                        ],
                        'regionDocumentType' => '12.999',
                        'externalSettings' => [
                            'externalId' => 'EXT-123',
                            'externalDateCreate' => '2025-02-18T09:19:34+03:00'
                        ]
                    ]
                ]
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

    ```javascript
    BX24.callMethod(
        'sign.b2e.document.send',
        {
            fields: {
                company: { crmId: 12 },
                members: [
                    { userId: 25, role: 'signer' },
                    { userId: 42, role: 'assignee' }
                ],
                responsible: { userId: 7 },
                companyProviderUid: 'd4f6b8a1-4c6d-4d8c-9c7c-2d1b1f6d0f2b',
                files: [
                    {
                        fileName: 'contract.pdf',
                        fileType: 'application/pdf',
                        fileContent: 'JVBERi0xLjQKJ...'
                    }
                ],
                regionDocumentType: '12.999',
                externalSettings: {
                    externalId: 'EXT-123',
                    externalDateCreate: '2025-02-18T09:19:34+03:00'
                }
            }
        },
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sign.b2e.document.send',
        [
            'fields' => [
                'company' => [ 'crmId' => 12 ],
                'members' => [
                    [ 'userId' => 25, 'role' => 'signer' ],
                    [ 'userId' => 42, 'role' => 'assignee' ]
                ],
                'responsible' => [ 'userId' => 7 ],
                'companyProviderUid' => 'd4f6b8a1-4c6d-4d8c-9c7c-2d1b1f6d0f2b',
                'files' => [
                    [
                        'fileName' => 'contract.pdf',
                        'fileType' => 'application/pdf',
                        'fileContent' => 'JVBERi0xLjQKJ...'
                    ]
                ],
                'regionDocumentType' => '12.999',
                'externalSettings' => [
                    'externalId' => 'EXT-123',
                    'externalDateCreate' => '2025-02-18T09:19:34+03:00'
                ]
            ]
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "uid": "b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c",
        "state": {
            "code": "sent",
            "name": "Отправлен"
        },
        "members": [
            {
                "uid": "f1c2d3e4",
                "role": "signer",
                "party": 0,
                "user": {
                    "employeeCode": "EMP-001",
                    "employeeId": 123,
                    "userId": 25
                },
                "state": {
                    "code": "waiting",
                    "name": "Ожидает"
                }
            }
        ]
    },
    "time": {
        "start": 1739860000.123,
        "finish": 1739860000.456,
        "duration": 0.333,
        "processing": 0.111,
        "date_start": "2026-02-10T09:19:34+03:00",
        "date_finish": "2026-02-10T09:19:34+03:00",
        "operating_reset_at": 1739860600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Информация о документе и участниках подписания ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор документа ||
|| **state**
[`object`](../data-types.md) | Текущий статус документа ||
|| **members**
[`array`](../data-types.md) | Участники подписания ||
|#

#### Поля объекта result.state

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код статуса ||
|| **name**
[`string`](../data-types.md) | Название статуса ||
|#

#### Элемент массива result.members

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор участника ||
|| **role**
[`string`](../data-types.md) | Роль участника ||
|| **party**
[`integer`](../data-types.md) | Сторона подписания ||
|| **user**
[`object`](../data-types.md) | Данные пользователя ||
|| **state**
[`object`](../data-types.md) | Статус участника ||
|#

#### Поля объекта result.members.user

#|
|| **Название**
`тип` | **Описание** ||
|| **employeeCode**
[`string`](../data-types.md) | Код сотрудника в HCM Link ||
|| **employeeId**
[`integer`](../data-types.md) | Идентификатор сотрудника в HCM Link ||
|| **userId**
[`integer`](../data-types.md) | Идентификатор пользователя в Битрикс24 ||
|#

#### Поля объекта result.members.state

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код статуса участника ||
|| **name**
[`string`](../data-types.md) | Название статуса участника ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "BAD_REQUEST",
    "error_description": "[companyProviderUid] field is required"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав ||
|| `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Вызов не из контекста приложения ||
|| `BAD_REQUEST` | Empty request fields | Не передан объект `fields` ||
|| `BAD_REQUEST` | companyProviderUid field is required | Не передан `companyProviderUid` ||
|| `BAD_REQUEST` | The responsible field is required | Не передан `responsible` ||
|| `BAD_REQUEST` | At least one signing party with role signer is required | В `members` нет участника с ролью `signer` ||
|| `BAD_REQUEST` | At least one signing party with role assignee is required | В `members` нет участника с ролью `assignee` ||
|| `BAD_REQUEST` | Invalid role ... | Передана роль вне допустимых значений ||
|| `BAD_REQUEST` | Employee ID is required | Не передан `employeeId`/`employeeCode` и не передан `userId` ||
|| `BAD_REQUEST` | Employee with code ... was not found | Сотрудник с указанным `employeeCode` не найден ||
|| `BAD_REQUEST` | Employee with ID ... was not found | Сотрудник с указанным `employeeId` не найден ||
|| `BAD_REQUEST` | Could not find employee for specified User ID | Пользователь по `userId` не найден ||
|| `BAD_REQUEST` | Could not find user for specified employee | Для сотрудника не найден пользователь ||
|| `BAD_REQUEST` | At least one file is required to sign the document | Не передан массив `files` ||
|| `BAD_REQUEST` | Signing multiple files is currently not supported | В `files` передано более одного файла ||
|| `BAD_REQUEST` | The specified file type is not supported | Указан `fileType`, отличный от `application/pdf` ||
|| `BAD_REQUEST` | Invalid file name | Некорректное имя файла ||
|| `BAD_REQUEST` | Invalid file name. File extension is not specified | Не указано расширение файла ||
|| `BAD_REQUEST` | The specified file extension is not supported | Расширение файла не поддерживается ||
|| `BAD_REQUEST` | Region document type is required. Use value '12.999' as a default value | Не передан `regionDocumentType` при наличии списка кодов ||
|| `BAD_REQUEST` | Region document type is not valid. Use value '12.999' as a default value | Передан неподдерживаемый `regionDocumentType` ||
|| `BAD_REQUEST` | Signing provider is not available | Провайдер недоступен для компании ||
|| `BAD_REQUEST` | Signing provider has expired | Истек срок действия провайдера ||
|| `BAD_REQUEST` | External date create field is required | Не передан `externalSettings.externalDateCreate` ||
|| `BAD_REQUEST` | External ID field is required | Не передан `externalSettings.externalId` ||
|| `BAD_REQUEST` | External date create invalid field value | Неверный формат даты в `externalSettings.externalDateCreate` ||
|| `BAD_REQUEST` | External ID maximum length of 255 is exceeded | Превышена длина `externalSettings.externalId` ||
|| `INTERNAL_ERROR` | Internal error | Ошибка при отправке документа или формировании ответа ||
|| `-` | humanresources module is not installed | Модуль `humanresources` не установлен ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-document-get.md)
- [{#T}](./sign-b2e-company-provider-list.md)
- [{#T}](./index.md)
