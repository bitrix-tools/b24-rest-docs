# Как добавить товар со значениями пользовательских полей

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

убрала из меню, чтобы не публиковался. Надо полностью переделывать, crm.product.add не актуальный

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример заполнения различных свойств при добавлении товара.

Для работы примера создайте папку **/pictures** рядом с исполняемым файлом примера и заполнитее ее картинками с названиями «1.jpg» — «6.jpg». Также в начале примера необходимо исправить значения переменных из примера на ваши:

- `propertyIDSelect` — идентификатор не множественного списочного свойства
- `propertySelectValueID` — идентификатор значения не множественного списочного свойства
- `propertyIDMultiSelect` — идентификатор множественного списочного свойства
- `propertyMultiSelectValueID` — идентификатор значений множественного списочного свойства
- `propertyIDFile` — идентификатор не множественного свойства типа файл
- `propertyIDMultiFile` — идентификатор множественного свойства типа файл

{% list tabs %}

- JS

    ```js
    document.addEventListener('DOMContentLoaded', function() {
        let propertyIDSelect = 106;
        let propertySelectValueID = 85;

        let propertyIDMultiSelect = 105;
        let propertyMultiSelectValueID = [79, 80, 82];

        let propertyIDFile = 107;
        let propertyFilePathToPicture = 'pictures/1.jpg';

        let propertyIDMultiFile = 108;
        let propertyMultiFilePathToPicture = [
            'pictures/2.jpg',
            'pictures/3.jpg',
            'pictures/4.jpg'
        ];

        let standardPreviewPicturePath = 'pictures/5.jpg';
        let standardDetailPicturePath = 'pictures/6.jpg';

        let arFields = {
            'NAME': 'Example product 2',
            'CURRENCY_ID': 'USD',
            'PRICE': 4900,
            'SORT': 500
        };

        if (propertyIDSelect > 0 && propertySelectValueID > 0) {
            arFields['PROPERTY_' + propertyIDSelect] = propertySelectValueID;
        }

        if (propertyIDMultiSelect > 0 && Array.isArray(propertyMultiSelectValueID) && propertyMultiSelectValueID.length > 0) {
            arFields['PROPERTY_' + propertyIDMultiSelect] = propertyMultiSelectValueID;
        }

        function fileToBase64(filePath) {
            return new Promise((resolve, reject) => {
                fetch(filePath)
                    .then(response => response.blob())
                    .then(blob => {
                        let reader = new FileReader();
                        reader.onload end = () => resolve(reader.result.split(',')[1]);
                        reader.oner ror = reject;
                        reader.readAsDataURL(blob);
                    });
            });
        }

        async function prepareFiles() {
            if (propertyIDFile > 0 && propertyFilePathToPicture) {
                let fileName = propertyFilePathToPicture.split('/').pop();
                arFields['PROPERTY_' + propertyIDFile] = {
                    "fileData": [
                        fileName,
                        await fileToBase64(propertyFilePathToPicture)
                    ]
                };
            }

            if (propertyIDMultiFile > 0 && Array.isArray(propertyMultiFilePathToPicture) && propertyMultiFilePathToPicture.length > 0) {
                arFields['PROPERTY_' + propertyIDMultiFile] = [];
                for (let path of propertyMultiFilePathToPicture) {
                    let fileName = path.split('/').pop();
                    arFields['PROPERTY_' + propertyIDMultiFile].push({
                        "fileData": [
                            fileName,
                            await fileToBase64(path)
                        ]
                    });
                }
            }

            if (standardPreviewPicturePath) {
                let fileName = standardPreviewPicturePath.split('/').pop();
                arFields['PREVIEW_PICTURE'] = {
                    "fileData": [
                        fileName,
                        await fileToBase64(standardPreviewPicturePath)
                    ]
                };
            }

            if (standardDetailPicturePath) {
                let fileName = standardDetailPicturePath.split('/').pop();
                arFields['DETAIL_PICTURE'] = {
                    "fileData": [
                        fileName,
                        await fileToBase64(standardDetailPicturePath)
                    ]
                };
            }

            BX24.callMethod(
                'crm.product.add',
                {
                    'fields': arFields
                },
                function(result) {
                    if (result.error()) {
                        console.error(result.error());
                    } else {
                        console.log('Product added successfully');
                    }
                }
            );
        }

        prepareFiles();
    });
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
        $propertyIDSelect = 106;
        $propertySelectValueID = 85;
        
        $propertyIDMultiSelect = 105;
        $propertyMultiSelectValueID = [79,80,82];
        
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
            'NAME'        => 'Example product 2',
            'CURRENCY_ID' => 'USD',
            'PRICE'     => 4900,
            'SORT'        => 500
        ];
        
        
        if($propertyIDSelect > 0 && $propertySelectValueID > 0)
        {
            $arFields[ 'PROPERTY_' . $propertyIDSelect ] = $propertySelectValueID;
        }
        
        if($propertyIDMultiSelect > 0 && is_array($propertyMultiSelectValueID) && count($propertyMultiSelectValueID) > 0)
        {
            $arFields[ 'PROPERTY_' . $propertyIDMultiSelect ] = $propertyMultiSelectValueID;
        }
        
        if($propertyIDFile > 0 && !empty($propertyFilePathToPicture) && file_exists($propertyFilePathToPicture))
        {
            $fileName = end(explode('/', $propertyFilePathToPicture));
            $arFields[ 'PROPERTY_' . $propertyIDFile ] = [
                "fileData" => [
                    $fileName,
                    base64_encode(file_get_contents($propertyFilePathToPicture))
                ]
            ];
        }
        
        if($propertyIDMultiFile > 0 && is_array($propertyMultiFilePathToPicture) && count($propertyMultiFilePathToPicture) > 0)
        {
            foreach($propertyMultiFilePathToPicture as $path){
                if(file_exists($path))
                {
                    $fileName = end(explode('/', $path));
                    $arFields[ 'PROPERTY_' . $propertyIDMultiFile ][] = [
                        "fileData" => [
                            $fileName,
                            base64_encode(file_get_contents($path))
                        ]
                    ];
                }
            }
        }
        
        if(!empty($standardPreviewPicturePath) && file_exists($standardPreviewPicturePath))
        {
            $fileName = end(explode('/', $standardPreviewPicturePath));
            $arFields[ 'PREVIEW_PICTURE' ] = [
                "fileData" => [
                    $fileName,
                    base64_encode(file_get_contents($standardPreviewPicturePath))
                ]
            ];
        }
        
        if(!empty($standardDetailPicturePath) && file_exists($standardDetailPicturePath))
        {
            $fileName = end(explode('/', $standardDetailPicturePath));
            $arFields[ 'DETAIL_PICTURE' ] = [
                "fileData" => [
                    $fileName,
                    base64_encode(file_get_contents($standardDetailPicturePath))
                ]
            ];
        }
        
        $result = CRest ::call(
            'crm.product.add',
            [
                'fields' => $arFields
            
            ]
        );

    ?>
    ```

{% endlist %}
