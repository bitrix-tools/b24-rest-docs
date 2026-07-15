# Как изменить значения пользовательских полей товара

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

убрала из меню, чтобы не публиковался. Надо полностью переделывать, crm.product.* не актуальные

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Примеры работы с различными свойствами товара.

Для работы примеров необходимо создать папку **/pictures** рядом с исполняемым файлом примера и заполнить ее картинками с названиями «1.jpg» — «6.jpg». Также в начале примера необходимо исправить значения переменных из примера на ваши:

- `propertyIDSelect` — идентификатор не множественного списочного свойства
- `propertySelectValueID` — идентификатор значения не множественного списочного свойства
- `propertyIDMultiSelect` — идентификатор множественного списочного свойства
- `propertyMultiSelectValueID` — идентификаторD значений множественного списочного свойства
- `propertyIDFile` — идентификатор не множественного свойства типа файл
- `propertyIDMultiFile` — идентификатор множественного свойства типа файл

## Изменение товара

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    let idProduct = 10339;

    let propertyIDSelect = 106;
    let propertySelectValueID = 85;

    let propertyIDMultiSelect = 105;
    let propertyMultiSelectValueID = [79, 80, 82];

    let propertyIDFile = 107;
    let propertyFilePathToPicture = 'pictures/1.jpg'; // relative or full path on server

    let propertyIDMultiFile = 108;
    let propertyMultiFilePathToPicture = [ // relative or full path on server
        'pictures/2.jpg',
        'pictures/3.jpg',
        'pictures/4.jpg',
    ];

    let standardPreviewPicturePath = 'pictures/5.jpg'; // relative or full path on server
    let standardDetailPicturePath = 'pictures/6.jpg'; // relative or full path on server

    let arFields = {
        'NAME': 'Example product 2',
        'CURRENCY_ID': 'USD',
        'PRICE': 4900,
        'SORT': 500
    };

    const resultGet = await $b24.actions.v2.call.make({
        method: 'crm.product.get',
        params: {
            'id': idProduct
        }
    });

    let arProduct = {};
    if (!resultGet.isSuccess) {
        console.error(resultGet.getErrorMessages().join('; '));
    } else {
        arProduct = resultGet.getData().result;
        if (propertyIDSelect > 0 && propertySelectValueID > 0) {
            arFields['PROPERTY_' + propertyIDSelect] = propertySelectValueID;
        }

        if (propertyIDMultiSelect > 0 && Array.isArray(propertyMultiSelectValueID) && propertyMultiSelectValueID.length > 0) {
            arFields['PROPERTY_' + propertyIDMultiSelect] = propertyMultiSelectValueID;
        }

        if (propertyIDFile > 0 && propertyFilePathToPicture && fileExists(propertyFilePathToPicture)) {
            let fileName = propertyFilePathToPicture.split('/').pop();
            arFields['PROPERTY_' + propertyIDFile] = {
                "fileData": [
                    fileName,
                    base64Encode(fileGetContents(propertyFilePathToPicture))
                ]
            };
        }

        if (propertyIDMultiFile > 0 && Array.isArray(propertyMultiFilePathToPicture) && propertyMultiFilePathToPicture.length > 0) {
            arFields['PROPERTY_' + propertyIDMultiFile] = [];
            propertyMultiFilePathToPicture.forEach(function(path) {
                if (fileExists(path)) {
                    let fileName = path.split('/').pop();
                    arFields['PROPERTY_' + propertyIDMultiFile].push({
                        "fileData": [
                            fileName,
                            base64Encode(fileGetContents(path))
                        ]
                    });
                }
            });
        }

        if (standardPreviewPicturePath && fileExists(standardPreviewPicturePath)) {
            let fileName = standardPreviewPicturePath.split('/').pop();
            arFields['PREVIEW_PICTURE'] = {
                "fileData": [
                    fileName,
                    base64Encode(fileGetContents(standardPreviewPicturePath))
                ]
            };
        }

        if (standardDetailPicturePath && fileExists(standardDetailPicturePath)) {
            let fileName = standardDetailPicturePath.split('/').pop();
            arFields['DETAIL_PICTURE'] = {
                "fileData": [
                    fileName,
                    base64Encode(fileGetContents(standardDetailPicturePath))
                ]
            };
        }
    }

    function fileExists(filePath) {
        // Implement file existence check
    }

    function fileGetContents(filePath) {
        // Implement file get contents
    }

    function base64Encode(data) {
        // Implement base64 encoding
    }

    // delete old files
    let arPropsFile = [
        'PREVIEW_PICTURE',
        'DETAIL_PICTURE',
    ];
    if (propertyIDFile > 0) {
        arPropsFile.push('PROPERTY_' + propertyIDFile);
    }
    if (propertyIDMultiFile > 0) {
        arPropsFile.push('PROPERTY_' + propertyIDMultiFile);
    }
    arPropsFile.forEach(function(prop) {
        if (!arFields[prop]) { // if property does not change file don't delete old file
            return;
        }

        if (arProduct[prop] && arProduct[prop].id) { // for standard fields PREVIEW_PICTURE and DETAIL_PICTURE
            arFields[prop].push({
                'id': arProduct[prop].id,
                'remove': 'Y'
            });
        } else if (arProduct[prop] && arProduct[prop].value && arProduct[prop].value.id) { // for property type file
            arFields[prop].push({
                'valueId': arProduct[prop].valueId,
                'value': {
                    'id': arProduct[prop].value.id,
                    'remove': 'Y'
                }
            });
        } else if (!arProduct[prop].value && Array.isArray(arProduct[prop])) { // for property type multiple file
            arProduct[prop].forEach(function(file) {
                if (file.value && file.value.id) {
                    arFields[prop].push({
                        'valueId': file.valueId,
                        'value': {
                            'id': file.value.id,
                            'remove': 'Y'
                        }
                    });
                }
            });
        }
    });

    const resultUpdate = await $b24.actions.v2.call.make({
        method: 'crm.product.update',
        params: {
            'id': idProduct,
            'fields': arFields
        }
    });

    if (!resultUpdate.isSuccess) {
        console.error(resultUpdate.getErrorMessages().join('; '));
    } else {
        console.dir(resultUpdate.getData().result);
    }
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $idProduct = 10339;

    $propertyIDSelect = 106;
    $propertySelectValueID = 85;

    $propertyIDMultiSelect = 105;
    $propertyMultiSelectValueID = [79, 80, 82];

    $propertyIDFile = 107;
    $propertyFilePathToPicture = 'pictures/1.jpg';//relative or full path on server

    $propertyIDMultiFile = 108;
    $propertyMultiFilePathToPicture = [//relative or full path on server
        'pictures/2.jpg',
        'pictures/3.jpg',
        'pictures/4.jpg',
    ];

    $standardPreviewPicturePath = 'pictures/5.jpg';//relative or full path on server
    $standardDetailPicturePath = 'pictures/6.jpg';//relative or full path on server

    $arFields = [
        'NAME' => 'Example product 2',
        'CURRENCY_ID' => 'USD',
        'PRICE' => 4900,
        'SORT' => 500
    ];

    $arProduct = $serviceBuilder->core->call(
        'crm.product.get',
        [
            'id' => $idProduct
        ]
    )->getResponseData()->getResult();
    if (!empty($arProduct))
    {
        if ($propertyIDSelect > 0 && $propertySelectValueID > 0)
        {
            $arFields['PROPERTY_' . $propertyIDSelect] = $propertySelectValueID;
        }

        if ($propertyIDMultiSelect > 0 && is_array($propertyMultiSelectValueID) && count($propertyMultiSelectValueID) > 0)
        {
            $arFields['PROPERTY_' . $propertyIDMultiSelect] = $propertyMultiSelectValueID;
        }

        if ($propertyIDFile > 0 && !empty($propertyFilePathToPicture) && file_exists($propertyFilePathToPicture))
        {
            $pathParts = explode('/', $propertyFilePathToPicture);
            $fileName = end($pathParts);
            $arFields['PROPERTY_' . $propertyIDFile] = [
                "fileData" => [
                    $fileName,
                    base64_encode(file_get_contents($propertyFilePathToPicture))
                ]
            ];
        }
        if ($propertyIDMultiFile > 0 &&
            is_array($propertyMultiFilePathToPicture) &&
            count($propertyMultiFilePathToPicture) > 0)
        {
            foreach ($propertyMultiFilePathToPicture as $path)
            {
                if (file_exists($path))
                {
                    $pathParts = explode('/', $path);
                    $fileName = end($pathParts);
                    $arFields['PROPERTY_' . $propertyIDMultiFile][] = [
                        "fileData" => [
                            $fileName,
                            base64_encode(file_get_contents($path))
                        ]
                    ];
                }
            }
        }
        if (!empty($standardPreviewPicturePath) && file_exists($standardPreviewPicturePath))
        {
            $pathParts = explode('/', $standardPreviewPicturePath);
            $fileName = end($pathParts);
            $arFields['PREVIEW_PICTURE'] = [
                "fileData" => [
                    $fileName,
                    base64_encode(file_get_contents($standardPreviewPicturePath))
                ]
            ];
        }
        if (!empty($standardDetailPicturePath) && file_exists($standardDetailPicturePath))
        {
            $pathParts = explode('/', $standardDetailPicturePath);
            $fileName = end($pathParts);
            $arFields['DETAIL_PICTURE'] = [
                "fileData" => [
                    $fileName,
                    base64_encode(file_get_contents($standardDetailPicturePath))
                ]
            ];
        }

        //delete old files
        $arPropsFile = [
            'PREVIEW_PICTURE',
            'DETAIL_PICTURE',
        ];
        if ($propertyIDFile > 0)
        {
            $arPropsFile[] = 'PROPERTY_' . $propertyIDFile;
        }
        if ($propertyIDMultiFile > 0)
        {
            $arPropsFile[] = 'PROPERTY_' . $propertyIDMultiFile;
        }
        foreach ($arPropsFile as $prop)
        {
            if (empty($arFields[$prop]))//if property does not change file dont delete old file
            {
                continue;
            }

            if (!empty($arProduct[$prop]['id']))//for standard fields PREVIEW_PICTURE and DETAIL_PICTURE
            {
                $arFields[$prop][] = [
                    'id' => $arProduct[$prop]['id'],
                    'remove' => 'Y',
                ];
            }
            elseif (!empty($arProduct[$prop]['value']['id']))//for property type file
            {
                $arFields[$prop][] = [
                    'valueId' => $arProduct[$prop]['valueId'],
                    'value' => [
                        'id' => $arProduct[$prop]['value']['id'],
                        'remove' => 'Y',
                    ]
                ];
            }
            elseif (!isset($arProduct[$prop]['value']) && is_array($arProduct[$prop]))//for property type multiple file
            {
                foreach ($arProduct[$prop] as $file)
                {
                    if (!empty($file['value']['id']))
                    {
                        $arFields[$prop][] = [
                            'valueId' => $file['valueId'],
                            'value' => [
                                'id' => $file['value']['id'],
                                'remove' => 'Y',
                            ]
                        ];
                    }

                }
            }
        }

        $result = $serviceBuilder->getCRMScope()->product()->update($idProduct, $arFields);

    }
    ```

- Python

    ```python
    import base64
    import os

    from b24pysdk import BitrixWebhook

    # методы crm.product.* вызываем напрямую через токен
    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )

    id_product = 10339

    property_id_select = 106
    property_select_value_id = 85

    property_id_multi_select = 105
    property_multi_select_value_id = [79, 80, 82]

    property_id_file = 107
    property_file_path_to_picture = "pictures/1.jpg"  # relative or full path on server

    property_id_multi_file = 108
    property_multi_file_path_to_picture = [  # relative or full path on server
        "pictures/2.jpg",
        "pictures/3.jpg",
        "pictures/4.jpg",
    ]

    standard_preview_picture_path = "pictures/5.jpg"  # relative or full path on server
    standard_detail_picture_path = "pictures/6.jpg"  # relative or full path on server


    def file_to_base64(file_path):
        with open(file_path, "rb") as file:
            return base64.b64encode(file.read()).decode()


    ar_fields = {
        "NAME": "Example product 2",
        "CURRENCY_ID": "USD",
        "PRICE": 4900,
        "SORT": 500,
    }

    ar_product = token.call_method("crm.product.get", {"id": id_product})["result"]
    if ar_product:
        if property_id_select > 0 and property_select_value_id > 0:
            ar_fields[f"PROPERTY_{property_id_select}"] = property_select_value_id

        if property_id_multi_select > 0 and property_multi_select_value_id:
            ar_fields[f"PROPERTY_{property_id_multi_select}"] = property_multi_select_value_id

        if property_id_file > 0 and property_file_path_to_picture and os.path.exists(property_file_path_to_picture):
            file_name = os.path.basename(property_file_path_to_picture)
            ar_fields[f"PROPERTY_{property_id_file}"] = {
                "fileData": [file_name, file_to_base64(property_file_path_to_picture)]
            }

        if property_id_multi_file > 0 and property_multi_file_path_to_picture:
            ar_fields[f"PROPERTY_{property_id_multi_file}"] = []
            for path in property_multi_file_path_to_picture:
                if os.path.exists(path):
                    file_name = os.path.basename(path)
                    ar_fields[f"PROPERTY_{property_id_multi_file}"].append({
                        "fileData": [file_name, file_to_base64(path)]
                    })

        if standard_preview_picture_path and os.path.exists(standard_preview_picture_path):
            file_name = os.path.basename(standard_preview_picture_path)
            ar_fields["PREVIEW_PICTURE"] = {
                "fileData": [file_name, file_to_base64(standard_preview_picture_path)]
            }

        if standard_detail_picture_path and os.path.exists(standard_detail_picture_path):
            file_name = os.path.basename(standard_detail_picture_path)
            ar_fields["DETAIL_PICTURE"] = {
                "fileData": [file_name, file_to_base64(standard_detail_picture_path)]
            }

        # delete old files
        ar_props_file = [
            "PREVIEW_PICTURE",
            "DETAIL_PICTURE",
        ]
        if property_id_file > 0:
            ar_props_file.append(f"PROPERTY_{property_id_file}")
        if property_id_multi_file > 0:
            ar_props_file.append(f"PROPERTY_{property_id_multi_file}")

        for prop in ar_props_file:
            if not ar_fields.get(prop):  # if property does not change file don't delete old file
                continue

            current = ar_product.get(prop)
            if isinstance(current, dict) and current.get("id"):  # for standard fields PREVIEW_PICTURE and DETAIL_PICTURE
                ar_fields[prop] = {
                    "id": current["id"],
                    "remove": "Y",
                    "fileData": ar_fields[prop]["fileData"],
                }
            elif isinstance(current, dict) and (current.get("value") or {}).get("id"):  # for property type file
                ar_fields[prop].append({
                    "valueId": current["valueId"],
                    "value": {"id": current["value"]["id"], "remove": "Y"},
                })
            elif isinstance(current, list):  # for property type multiple file
                for file in current:
                    if (file.get("value") or {}).get("id"):
                        ar_fields[prop].append({
                            "valueId": file["valueId"],
                            "value": {"id": file["value"]["id"], "remove": "Y"},
                        })

        result = token.call_method("crm.product.update", {"id": id_product, "fields": ar_fields})
    ```

{% endlist %}

## Очистка свойств с файлами в товаре

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    let idProduct = 10339;

    let propertyIDFile = 107;
    let propertyIDMultiFile = 108;

    const resultGet = await $b24.actions.v2.call.make({
        method: 'crm.product.get',
        params: {
            'id': idProduct
        }
    });

    if (!resultGet.isSuccess) {
        console.error(resultGet.getErrorMessages().join('; '));
    } else {
        let arProduct = resultGet.getData().result;
        let arPropsFile = [
            'PREVIEW_PICTURE',
            'DETAIL_PICTURE',
        ];
        if (propertyIDFile > 0) {
            arPropsFile.push('PROPERTY_' + propertyIDFile);
        }
        if (propertyIDMultiFile > 0) {
            arPropsFile.push('PROPERTY_' + propertyIDMultiFile);
        }
        let arSaveData = {};
        arPropsFile.forEach(function(prop) {
            if (arProduct[prop] && arProduct[prop].id) { // for standard fields PREVIEW_PICTURE and DETAIL_PICTURE
                arSaveData[prop] = {
                    'id': arProduct[prop].id,
                    'remove': 'Y'
                };
            } else if (arProduct[prop] && arProduct[prop].value && arProduct[prop].value.id) { // for property type file
                arSaveData[prop] = {
                    'valueId': arProduct[prop].valueId,
                    'value': {
                        'id': arProduct[prop].value.id,
                        'remove': 'Y'
                    }
                };
            } else if (!arProduct[prop].value && Array.isArray(arProduct[prop])) { // for property type multiple file
                arProduct[prop].forEach(function(file) {
                    if (file.value && file.value.id) {
                        if (!arSaveData[prop]) {
                            arSaveData[prop] = [];
                        }
                        arSaveData[prop].push({
                            'valueId': file.valueId,
                            'value': {
                                'id': file.value.id,
                                'remove': 'Y'
                            }
                        });
                    }
                });
            }
        });

        const resultSave = await $b24.actions.v2.call.make({
            method: 'crm.product.update',
            params: {
                'id': idProduct,
                'fields': arSaveData
            }
        });

        if (!resultSave.isSuccess) {
            console.error(resultSave.getErrorMessages().join('; '));
        } else {
            console.dir(resultSave.getData().result);
        }
    }
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $idProduct = 10339;

    $propertyIDFile = 107;
    $propertyIDMultiFile = 108;

    $arProduct = $serviceBuilder->core->call(
        'crm.product.get',
        [
            'id' => $idProduct
        ]
    )->getResponseData()->getResult();

    $arSaveData = [];
    if (!empty($arProduct))
    {
        $arPropsFile = [
            'PREVIEW_PICTURE',
            'DETAIL_PICTURE',
        ];
        if ($propertyIDFile > 0)
        {
            $arPropsFile[] = 'PROPERTY_' . $propertyIDFile;
        }
        if ($propertyIDMultiFile > 0)
        {
            $arPropsFile[] = 'PROPERTY_' . $propertyIDMultiFile;
        }
        foreach ($arPropsFile as $prop)
        {
            if (!empty($arProduct[$prop]['id']))//for standard fields PREVIEW_PICTURE and DETAIL_PICTURE
            {
                $arSaveData[$prop] = [
                    'id' => $arProduct[$prop]['id'],
                    'remove' => 'Y',
                ];
            }
            elseif (!empty($arProduct[$prop]['value']['id']))//for property type file
            {
                $arSaveData[$prop] = [
                    'valueId' => $arProduct[$prop]['valueId'],
                    'value' => [
                        'id' => $arProduct[$prop]['value']['id'],
                        'remove' => 'Y',
                    ]
                ];
            }
            elseif (!isset($arProduct[$prop]['value']) && is_array($arProduct[$prop]))//for property type multiple file
            {
                foreach ($arProduct[$prop] as $file)
                {
                    if (!empty($file['value']['id']))
                    {
                        $arSaveData[$prop][] = [
                            'valueId' => $file['valueId'],
                            'value' => [
                                'id' => $file['value']['id'],
                                'remove' => 'Y',
                            ]
                        ];
                    }

                }
            }
        }
    }

    $resultSave = $serviceBuilder->getCRMScope()->product()->update($idProduct, $arSaveData);
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook

    # методы crm.product.* вызываем напрямую через токен
    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )

    id_product = 10339

    property_id_file = 107
    property_id_multi_file = 108

    ar_product = token.call_method("crm.product.get", {"id": id_product})["result"]

    ar_save_data = {}
    if ar_product:
        ar_props_file = [
            "PREVIEW_PICTURE",
            "DETAIL_PICTURE",
        ]
        if property_id_file > 0:
            ar_props_file.append(f"PROPERTY_{property_id_file}")
        if property_id_multi_file > 0:
            ar_props_file.append(f"PROPERTY_{property_id_multi_file}")

        for prop in ar_props_file:
            current = ar_product.get(prop)
            if isinstance(current, dict) and current.get("id"):  # for standard fields PREVIEW_PICTURE and DETAIL_PICTURE
                ar_save_data[prop] = {
                    "id": current["id"],
                    "remove": "Y",
                }
            elif isinstance(current, dict) and (current.get("value") or {}).get("id"):  # for property type file
                ar_save_data[prop] = {
                    "valueId": current["valueId"],
                    "value": {"id": current["value"]["id"], "remove": "Y"},
                }
            elif isinstance(current, list):  # for property type multiple file
                for file in current:
                    if (file.get("value") or {}).get("id"):
                        ar_save_data.setdefault(prop, []).append({
                            "valueId": file["valueId"],
                            "value": {"id": file["value"]["id"], "remove": "Y"},
                        })

    result_save = token.call_method("crm.product.update", {"id": id_product, "fields": ar_save_data})
    ```

{% endlist %}
