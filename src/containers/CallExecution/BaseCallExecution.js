import { Component } from 'react'

export default class BaseCallExecution extends Component {
    onClickProduct = (productTemplateId) => {
        let { selectedProducts, position, isReminder, selectedSamples, selectedFiles } = this.state
        let oldSelected = _.findIndex(selectedProducts, {position, IsReminder: isReminder})
        if(oldSelected > 0) {
            delete selectedProducts[oldSelected]
            delete selectedSamples[oldSelected]
            selectedFiles = _.dropWhile(selectedFiles, ['ProductId', oldSelected])
        }

        const product = _.find(this.props.products, ['ProductTemplateId', productTemplateId])
        selectedProducts[productTemplateId] = {
            ProductId: product.ProductTemplateId,
            name: product.ProductTemplateName,
            DetailingSeconds: 0,
            IsReminder: this.state.isReminder,
            position
        }
        selectedFiles = _.concat(selectedFiles, product.Files)
        this.setState({
            selectedFiles,
            selectedProducts,
            selectedProductId: productTemplateId,
            overlay: false,
        })
    }

    onClickSample = (productId) => {
        const selectedProduct = _.find(this.props.samples, ['ProductId', productId]);
        const productTemplate = _.find(this.props.products, ['ProductTemplateId', selectedProduct.ProductTemplateId]);

        let { selectedSamples } = this.state;

        selectedSamples[productTemplate.ProductTemplateId] = {
            IsReminder: this.state.isReminder,
            ProductId: productId,
            name: selectedProduct.ProductName,
            SampleQty: 0,
            ProductTemplateId: productTemplate.ProductTemplateId
        }
        this.setState({
            selectedSamples
        }
        // , () => console.log(this.state.selectedSamples)
        )
    }

    handleOverlayClose = (unselect = false) => {
        if(unselect) {
            let selectedSamples = this.state.selectedSamples;
            const {selectedProductId, reminderPosition} = this.state
            if(selectedProductId != 0) {
                delete selectedSamples[selectedProductId];
            }
            this.setState({
                selectedSamples,
                overlay: false,
                selectedProductId: 0,
            })
            return;
        }
        this.setState({
            overlay: false,
            selectedProductId: 0,
        }
        // , () => console.log(this.state.selectedProducts, this.state.selectedFiles, this.state.selectedSamples)
        )
    }

    setSampleCount = (number, type, productTemplateId) => {
        let allSamples = this.state.selectedSamples;
        let sample = allSamples[productTemplateId];
        sample.SampleQty = number;
        allSamples[productTemplateId] = sample;
        this.setState({
            selectedSamples: allSamples,
        })
    }

    showSamplesOverlay = (selectedProduct, position) => {
        this.setState({
            samplesOverlay: true,
            position,
            selectedProductId: selectedProduct
        })
    }

    showProductsOverlay = (selectedProduct, position, type = 'planned') => {
        this.setState({
            overlay: true,
            position: position,
            selectedProductId: selectedProduct,
            isReminder: type != 'planned'
        })
    }

    hideProductsOverlay = (unselect = false) => {
        if(unselect) {
            let { selectedProducts, selectedSamples, selectedProductId, eDetailing, selectedFiles } = this.state
            const fileIds = _.map(_.filter(this.props.files, file => file.ProductId == selectedProductId), 'DetailingFileId')
            eDetailing = eDetailing.filter(detail => !fileIds.includes(detail.DetailingFileId))
            selectedFiles = selectedFiles.filter(file => file.ProductId != selectedProductId)
            delete selectedProducts[selectedProductId];
            delete selectedSamples[selectedProductId];
            return this.setState({
                selectedProducts,
                selectedSamples,
                eDetailing,
                selectedFiles,
                overlay: false,
                position: 0,
                selectedProductId: 0,
                isReminder: false
            })
        }
        this.setState({
            overlay: false,
            position: 0,
            selectedProductId: 0,
            isReminder: false
        })
    }

    handleSampleOverlayClose = (unselect = false) => {
        if(unselect) {
            let { selectedSamples, selectedProductId } = this.state
            delete selectedSamples[selectedProductId];
            this.setState({
                selectedSamples,
                samplesOverlay: false,
                position: 0,
                selectedProductId: 0,
            });
        }
        this.setState({
            samplesOverlay: false,
            position: 0,
            selectedProductId: 0,
        })
    }

    onChangeAdditionalInfoAttributes = (field, value) => {
        let dailyCall = this.state.form_data
        dailyCall.jsonDailyCall[field] = value
        this.setState({
            form_data: dailyCall
        })
    }

    onClickGift = (giftId, number = 0) => {
        let dailyCall = this.state.form_data
        const selected = dailyCall.jsonGiftDetail
        selected[0] = {
            GiftId: giftId, 
            GiftQty: number
        }
        dailyCall.jsonGiftDetail = selected
        this.setState({
            form_data: dailyCall
        })
    }

    showGifts = () => {
        this.setState({
            giftsOverlay: true
        })
    }

    hideGifts = (unselect = false) => {
        if(unselect) {
            let dailyCall = this.state.form_data;
            let giftDetail = dailyCall.jsonGiftDetail;
            giftDetail[0] = {
                GiftId: 0,
                GiftQty: 0
            }
            dailyCall.jsonGiftDetail = giftDetail
            this.setState({
                form_data: dailyCall
            })
        }
        this.setState({
            giftsOverlay: false
        })
    }

    hideDocInfoPanel = () => {
        this.setState({
            showDocInfoPanel: false
        })
    }

    updateDetailingSeconds = (fileId, seconds) => {
        const { eDetailing } = this.state
        if(eDetailing[fileId] == undefined) {
            eDetailing[fileId] = {
                DetailingFileId: fileId,
                Duration: seconds
            }
        } else {
            eDetailing[fileId].Duration = eDetailing[fileId].Duration == 0
            ? seconds
            : eDetailing[fileId].Duration + seconds;
        }
        this.setState({
            eDetailing
        }
        // , () => console.log('detailing seconds updated', this.state.eDetailing[fileId])
        );
    }


    initiateCallExecution = () => {
        if(this.props.isFetching){
            alert('Unable to capture your location, please try to move, refresh the application or open your location service if it is not.');
            return;
        }
        const { 
            state: { form_data: { isUpdateRequired } }, 
            context: { state: { isInternetReachable } }
         } = this;

        if(isUpdateRequired === true && isInternetReachable) {
            this.setState({
                showDocInfoPanel: true,
            })
            return;
        }
        this.submitCall();
    }

    

    updateDoctorInfo = (payload, onSuccess, onFailure) => {
        const { form_data: { jsonDailyCall: { DoctorCode } } } = this.state
        this.props.updateDoctor({DoctorCode, ...payload}, () => {
            onSuccess()
            this.submitCall();
        }, onFailure)
    }
}