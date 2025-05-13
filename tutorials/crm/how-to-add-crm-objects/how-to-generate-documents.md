# Как создать свой шаблон документа и документ на его основе

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример добавления своего шаблона документа и создания на его основе готового документа с данными, например, сделки. В примере **template.docx** — шаблон документа.

{% list tabs %}

- JS

    ```js
    document.addEventListener('DOMContentLoaded', function() {
        let filePath = 'template.docx'; // path to template local file
        let iDealID = 1; // deal ID
        let sDocName = 'Demo Packing Sheet UK';

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

        async function createDocument() {
            try {
                let fileContent = await fileToBase64(filePath);

                BX24.callMethod(
                    'crm.documentgenerator.numerator.add',
                    {
                        'fields': {
                            'name': 'Rest Numerator',
                            'template': '{NUMBER}'
                        }
                    },
                    function(resNum) {
                        if (resNum.error()) {
                            console.error(resNum.error());
                            alert('Numerator not added: ' + resNum.error_description());
                            return;
                        }

                        if (resNum.data().numerator.id) {
                            BX24.callMethod(
                                'crm.documentgenerator.template.add',
                                {
                                    'fields': {
                                        'name': sDocName,
                                        'numeratorId': resNum.data().numerator.id,
                                        'region': 'uk',
                                        'users': ['UA'],
                                        'entityTypeId': ['2'],
                                        'file': fileContent
                                    }
                                },
                                function(resTemplate) {
                                    if (resTemplate.error()) {
                                        console.error(resTemplate.error());
                                        alert('Template not added: ' + resTemplate.error_description());
                                        return;
                                    }

                                    if (resTemplate.data().template.id) {
                                        BX24.callMethod(
                                            'crm.documentgenerator.document.add',
                                            {
                                                'templateId': resTemplate.data().template.id,
                                                'entityTypeId': '2',
                                                'entityId': iDealID
                                            },
                                            function(resDoc) {
                                                if (resDoc.error()) {
                                                    console.error(resDoc.error());
                                                    alert('Docx not created: ' + resDoc.error_description());
                                                } else {
                                                    alert('Docx created');
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                alert('An error occurred: ' + error.message);
            }
        }

        createDocument();
    });
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../how-to-use-examples.md)

    {% endnote %}

    ```php
    $filePath = __DIR__ . '/template.docx'; // path to template local file
    $iDealID = 1;//deal ID
    $sDocName = 'Demo Packing Sheet UK';
    $resNum = CRest::call(
        'crm.documentgenerator.numerator.add',
        [
            'fields' => [
                'name' => 'Rest Numerator',
                'template' => '{NUMBER}',
            ]
        ]
    );
    if (!empty($resNum['result']['numerator']['id']))
    {
        $resTemplate = CRest::call(
            'crm.documentgenerator.template.add',
            [
                'fields' => [
                    'name' => $sDocName,
                    'numeratorId' => $resNum['result']['numerator']['id'],// crm.documentgenerator.numerator.add
                    'region' => 'uk',//eu,de,ua,by,ru
                    'users' => [
                        'UA'//User All
                    ],
                    'entityTypeId' => ['2'],//2 is deal in CRest::call('crm.enum.ownertype');
                    'file' => base64_encode(file_get_contents($filePath))
                ]
            ]
        );
        if (!empty($resTemplate['result']['template']['id']))
        {
            $resDoc = CRest::call(
                'crm.documentgenerator.document.add',
                [
                    'templateId' => $resTemplate['result']['template']['id'],
                    'entityTypeId' => '2',//2 is deal in CRest::call('crm.enum.ownertype');
                    'entityId' => $iDealID,
                ]
            );
        }
    }
    if (!empty($resDoc['result']))
    {
        echo json_encode(['message' => 'Docx creat']);
    }
    elseif (!empty($resDoc['error_description']))
    {
        echo json_encode(['message' => 'Docx not created: ' . $resDoc['error_description']]);
    }
    else
    {
        echo json_encode(['message' => 'Docx not created']);
    }
    ```

{% endlist %}

