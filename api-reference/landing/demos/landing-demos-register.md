# Зарегистрировать шаблон в мастере создания сайта landing.demos.register

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы (локализации блоков)

{% endnote %}

{% endif %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.demos.register` регистрирует шаблон в мастере создания сайта и страницы. Возвращает массив идентификаторов для созданных шаблонов. Выполнение метода прерывается, когда происходит ошибка в массиве элементов и возвращается описание ошибки.

{% note info %}

Для распространения созданного сайта, достаточно получить экспорт в файл на портале источнике, и распространить его приложение, вызвав данный метод при установке.

{% endnote %}

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **data**
[`unknown`](../../data-types.md) | Результат метода [landing.site.fullExport](../site/landing-site-full-export.md) как есть. ||
|| **params**
[`unknown`](../../data-types.md) | Может содержать следующие ключи (**только для коробочных версий**):
- **site_template_id** - привязка блока к определенному шаблону сайта (главного модуля). ||
|#

## Локализация

Для получения разъяснений по локализациям шаблона, пожалуйста, см. [здесь](./localization.md). Когда требуется локализация, раскомментируйте ключи **lang** и **lang_original**. Принцип, использованный здесь, аналогичен [локализации блоков](.). Имейте ввиду, что локализация применима только для основных фраз: названий страниц, описаний. Не перегружайте данный массив ненужной информацией.

## Примеры

Заметьте, что в примере использован результат метода [landing.site.fullExport](../site/landing-site-full-export.md).

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.fullExport',
    		{
    			id: 326,
    			params: {
    				edit_mode: 'Y',
    				code: 'myfirstsite',
    				name: 'Сайт автомастерской',
    				description: 'Сайт для вашего автосервиса. Под капотом все самое нужное.',
    				preview_url: 'http://sample.landing.mycompany.ru/',
    				preview: 'http://site.ru/preview.jpg',
    				preview2x: 'http://site.ru/preview.jpg',
    				preview3x: 'http://site.ru/preview.jpg',
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    	
    	const data = result.data();
    	const response2 = await $b24.callMethod(
    		'landing.demos.register',
    		{
    			data: data,
    			params: {
    				site_template_id: '',
    				//lang: {
    				//	en: {
    				//		'Фраза 1': 'Translate en 1',
    				//		'Фраза 2': 'Translate en 2'
    				//	},
    				//	de: {
    				//		'Фраза 1': 'Translate de 1',
    				//		'Фраза 2': 'Translate de 2'
    				//	}
    				//},
    				//lang_original: 'ru'
    			}
    		}
    	);
    	
    	const result2 = response2.getData().result;
    	console.info(result2);
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
                'landing.site.fullExport',
                [
                    'id'     => 326,
                    'params' => [
                        'edit_mode'    => 'Y',
                        'code'         => 'myfirstsite',
                        'name'         => 'Сайт автомастерской',
                        'description'  => 'Сайт для вашего автосервиса. Под капотом все самое нужное.',
                        'preview_url'  => 'http://sample.landing.mycompany.ru/',
                        'preview'      => 'http://site.ru/preview.jpg',
                        'preview2x'    => 'http://site.ru/preview.jpg',
                        'preview3x'    => 'http://site.ru/preview.jpg',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        $data = $result;
    
        $response2 = $b24Service
            ->core
            ->call(
                'landing.demos.register',
                [
                    'data'   => $data,
                    'params' => [
                        'site_template_id' => '',
                        //локализационный массив и оригинальный язык
                        /*'lang' => [
                            'en' => [
                                'Фраза 1' => 'Translate en 1',
                                'Фраза 2' => 'Translate en 2'
                            ],
                            'de' => [
                                'Фраза 1' => 'Translate de 1',
                                'Фраза 2' => 'Translate de 2'
                            ]
                        ],
                        'lang_original' => 'ru'*/
                    ],
                ]
            );
    
        $result2 = $response2
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result2, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.fullExport',
        {
            id: 326,
            params: {
                edit_mode: 'Y',
                code: 'myfirstsite',//symbolic code of site
                name: 'Сайт автомастерской',// наименование сайта (страницы)
                description: 'Сайт для вашего автосервиса. Под капотом все самое нужное.',//описание сайта
                preview_url: 'http://sample.landing.mycompany.ru/',//url предварительного просмотра
                preview: 'http://site.ru/preview.jpg',//основная превью-картинка для списка шаблонов (реком. 280x115)
                preview2x: 'http://site.ru/preview.jpg',//увеличенная превью-картинка (рекомен. 560x230)
                preview3x: 'http://site.ru/preview.jpg',//ретина-размер превью картинки (рекомен. 845x345)
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
                var data = result.data();
                console.info(data);
                BX24.callMethod(
                    'landing.demos.register',
                    {
                        data: data,
                        params: {
                            site_template_id: '',//передать значение шаблона, если вы регистрируете для своего шаблона (только коробка!)
                            //локализационный массив и оригинальный язык
                            /*lang: {
                                en: {
                                    'Фраза 1': 'Translate en 1',
                                    'Фраза 2': 'Translate en 2'
                                },
                                de: {
                                    'Фраза 1': 'Translate de 1',
                                    'Фраза 2': 'Translate de 2'
                                }
                            },
                            lang_original: 'ru'*/
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
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}