# Выполнить массовое изменение карточек блока landing.block.updateCards

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.block.updateCards` для массового изменения карточек блока. Вернет _true_ в случае успеха, или ошибку.

{% note warning %}

1. Метод полностью удалит текущие карточки блока.
2. Метод специфический и рекомендуется к применению только если ваши задачи не решает [landing.block.updatenodes](./landing-block-update-nodes.md).

{% endnote %}

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы. | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока. | ||
|| **data**
[`unknown`](../../../data-types.md) | Массив для изменения. Для пояснения смотрите пример. Опционально можно передавать [пресеты карточек](../extended-description.md).
Обратите внимание, селекторы формируются по похожему методу формирования в _landing.block.updatenodes_. | ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.updateCards',
    		{
    			lid: 2856,
    			block: 25458,
    			data: {
    				//воздействуем на данный селектор карточки
    				// (можно передавать и другие селекторы одновременно)
    				'.landing-block-card': {
    					//останется только данное кол-во карточек, у которых
    					//будут изменены только указанные ноды;
    					//для клонирования будет браться первая карточка
    					'values': [
    						{
    							'.landing-block-node-title': 'New title 0'
    						},
    						{
    							'.landing-block-node-title': 'New title 1'
    						},
    						{
    							'.landing-block-node-title': 'New title 2'
    						}
    					],
    					//опционально можно применить пресеты карточек (ключ - порядковый номер карточки, начиная с 0)
    					'presets': {
    						'1': 'preset_h2'
    					}
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch(error)
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
                'landing.block.updateCards',
                [
                    'lid'   => 2856,
                    'block' => 25458,
                    'data'  => [
                        '.landing-block-card' => [
                            'values'  => [
                                [
                                    '.landing-block-node-title' => 'New title 0'
                                ],
                                [
                                    '.landing-block-node-title' => 'New title 1'
                                ],
                                [
                                    '.landing-block-node-title' => 'New title 2'
                                ]
                            ],
                            'presets' => [
                                '1' => 'preset_h2'
                            ]
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating landing block cards: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.updateCards',
        {
            lid: 2856,
            block: 25458,
            data: {
                //воздействуем на данный селектор карточки
                // (можно передавать и другие селекторы одновременно)
                '.landing-block-card': {
                    //останется только данное кол-во карточек, у которых
                    //будут изменены только указанные ноды;
                    //для клонирования будет браться первая карточка
                    'values': [
                        {
                            '.landing-block-node-title': 'New title 0'
                        },
                        {
                            '.landing-block-node-title': 'New title 1'
                        },
                        {
                            '.landing-block-node-title': 'New title 2'
                        }
                    ],
                    //опционально можно применить пресеты карточек (ключ - порядковый номер карточки, начиная с 0)
                    'presets': {
                        '1': 'preset_h2'
                    }
                }
            }
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}