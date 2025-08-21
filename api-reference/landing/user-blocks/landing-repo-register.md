# Добавить пользовательский блок в репозиторий landing.repo.register

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

{% endnote %}

{% endif %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.repo.register` добавляет блок в репозиторий. Возвращает ошибку или `ID` добавленного блока. Этот `ID` используется для добавления блока на создаваемые программно лендинги.

При добавлении происходит проверка. Если блок с данным кодом уже присутствует в системе, произойдет его удаление.

Метод может вернуть ошибку об опасном содержимом блока. В этом случае требуется сначала проверить регистрируемое содержимое методом [landing.repo.checkContent](./landing-repo-check-content.md).

При разработке нового блока или изменении существующего может потребоваться быстрее увидеть изменение, чем это позволяет пере-добавление блока или флаг RESET. Рекомендуется для этих целей использовать метод [landing.block.updatecontent](../block/methods/landing-block-update-content.md). Метод передаёт в блок произвольный контент и отображает изменения практически "налету". После того как разработка закончена, разработчик может окончательно его зарегистрировать.

Метод подходит только для изменения контента. При изменении манифеста блок требуется перерегистрировать (без пере-добавления на страницу).

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **code**
[`unknown`](../../data-types.md) | Уникальный код вашего блока, по нему будет осуществляться удаление блока, если требуется. ||
|| **fields**
[`unknown`](../../data-types.md) | Массив полей, описывающих ваш блок, состоит из ключей:
- NAME - название блока
- DESCRIPTION - описание блока
- SECTIONS - категории, в которых должен появиться блок, через запятую.

  {% note info %}
  
  Если нужной категории нет в списке, просто напишите ее текстом в манифесте, категория будет добавлена. Ключом новой категории становится значение `md5(strtolower($sectionName))`.
  
  {% endnote %}

- PREVIEW - URL картинки, обложки блока
- CONTENT - html-содержимое блока
- ACTIVE - активность блока (Y / N)
- SITE_TEMPLATE_ID – привязка блока к определенному шаблона сайта главного модуля. **Только для коробочных версий!**

Дополнительные параметры:
- RESET - если передать со значением Y, то система автоматически обновит все добавленные на страницы блоки на новую верстку. [Подробнее...](https://dev.bitrix24.ru/company/personal/user/3/blog/2091/) ||
|| **manifest**
[`unknown`](../../data-types.md) | Массив манифеста, которым описывается блок. ||
|#

{% note info %}

Атрибут **style** может вырезаться встроенным санитайзером. Чтобы это обойти используйте вместо него атрибут **bxstyle**. При добавлении система конвертирует его в штатный style.

{% endnote %}


## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.repo.register',
    		<?= \CUtil::PhpToJSObject($data) ?>
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.info(result);
    	}
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.repo.register',
                [
                    'code' => 'myblockx',
                    'fields' => [
                        'NAME'        => 'Test block',
                        'DESCRIPTION' => 'Just try!',
                        'SECTIONS'    => 'cover,about',
                        'PREVIEW'     => 'https://www.bitrix24.ru/images/b24_screen.png',
                        'CONTENT'     => '
        <section class="landing-block">
            <div class="text-center g-color-gray-dark-v3 g-pa-10">
                <div class="g-width-600 mx-auto">
                    <div class="landing-block-node-text g-font-size-12 ">
                        <p>© 2017 All right reserved. Developed by
                        <a href="#" class="landing-block-node-link g-color-primary">Bitrix24</a></p>
                    </div>
                </div>
            </div>
        </section>'
                    ],
                    'manifest' => [
                        'assets' => [
                            'css' => [
                                'https://site.com/aaa.css'
                            ],
                            'js'  => [
                                'https://site.com/aaa.js'
                            ]
                        ],
                        'nodes'  => [
                            '.landing-block-node-text' => [
                                'name' => 'Text',
                                'type' => 'text',
                            ],
                            '.landing-block-node-link' => [
                                'name' => 'Link',
                                'type' => 'link',
                            ],
                        ],
                        'style'  => [
                            '.landing-block-node-text' => [
                                'name' => 'Text',
                                'type' => 'typo',
                            ],
                            '.landing-block-node-link' => [
                                'name' => 'Link',
                                'type' => 'typo',
                            ],
                        ],
                        'attrs'  => [
                            '.landing-block-node-text' => [
                                'name'      => 'Настройка копирайта',
                                'type'      => 'dropdown',
                                'attribute' => 'data-copy',
                                'items'     => [
                                    'val1' => 'Значение 1',
                                    'val2' => 'Значение 2'
                                ]
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling landing.repo.register: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    <?
    //для наглядности, передадим PHP-массив на исполнение JS
    $data = array(
        'code' => 'myblockx',
        'fields' => array(
            'NAME' => 'Test block',
            'DESCRIPTION' => 'Just try!',
            'SECTIONS' => 'cover,about',
            'PREVIEW' => 'https://www.bitrix24.ru/images/b24_screen.png',
            'CONTENT' => '
    <section class="landing-block">
        <div class="text-center g-color-gray-dark-v3 g-pa-10">
            <div class="g-width-600 mx-auto">
                <div class="landing-block-node-text g-font-size-12 ">
                    <p>© 2017 All right reserved. Developed by
                    <a href="#" class="landing-block-node-link g-color-primary">Bitrix24</a></p>
                </div>
            </div>
        </div>
    </section>'
        ),
        'manifest' => array(
            'assets' => array(
                'css' => array(
                    'https://site.com/aaa.css'
                ),
                'js' => array(
                    'https://site.com/aaa.js'
                )
            ),
            'nodes' =>
                array(
                    '.landing-block-node-text' =>
                        array(
                            'name' => 'Text',
                            'type' => 'text',
                        ),
                    '.landing-block-node-link' =>
                        array(
                            'name' => 'Link',
                            'type' => 'link',
                        ),
                ),
            'style' =>
                array(
                    '.landing-block-node-text' =>
                        array(
                            'name' => 'Text',
                            'type' => 'typo',
                        ),
                    '.landing-block-node-link' =>
                        array(
                            'name' => 'Link',
                            'type' => 'typo',
                        ),
                ),
            'attrs' =>
                array(
                '.landing-block-node-text' =>
                    array(
                        'name' => 'Настройка копирайта',
                        'type' => 'dropdown',
                        'attribute' => 'data-copy',
                        'items' => array(
                            'val1' => 'Значение 1',
                            'val2' => 'Значение 2'
                                )
                        ),
                ),
        ),
    );
    ?>
    // обратите внимание! далее идет JS код.
    BX24.callMethod(
        'landing.repo.register',
        //абстрактный метод, превращающий PHP-массив в JS-объект
        <?= \CUtil::PhpToJSObject($data)?>,
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}