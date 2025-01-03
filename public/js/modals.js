




genModal = (settings = {class: null, id: null, title: null, }) => { 
    return `
        <div id="testtest" class="gen-modal">
            <div class="modal-content">

                <span class="close">${$$ex("testtest")}</span>
                <p> some text....</p>
            </div>
        </div>

    `;
}

function deleteModal(settings = {class: null, id: null, title: null, text: null}) {
    return `
    <div class="modal fade ${settings.class ?? ""}" id="modal-${settings.id ?? ""}" tabindex="-1" role="dialog" aria-labelledby="modal-title-${settings.id}" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" id="modal-content-${settings.id ?? ""}">
            <div class="modal-header" id="modal-header-${settings.id ?? ""}">
                <h5 class="modal-title" id="modal-title-${settings.id ?? ""}">${settings.title ?? ""}</h5>
                <span class="gen-modal-container">
                    <span class="gen-close-button" id="modal-close-${settings.id ?? ""}">
                        ${$$ex(settings.id ?? "")} 
                    </span>
                </span>
            
            </div>
            <div class="modal-body" id="modal-body-${settings.id ?? ""}">
                <div class="form-field-container">
                    ${settings.text}
                </div>
            </div>
            <div class="modal-footer btn-group" role="group" id="modal-footer-${settings.id ?? ""}">
                <button type="button" class="btn btn-outline-secondary" id="modal-cancel-${settings.id}" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-outline-danger" id="modal-delete-${settings.id}">Delete</button>
            </div>
        </div>
    </div>
    </div>

`;
}












// {
//     <div class="modal fade ${settings.class ?? ""}" id="${settings.id ?? ""}" tabindex="-1" role="dialog" aria-labelledby="modal-title-${settings.id}" aria-hidden="true">
//     <div class="modal-dialog modal-dialog-centered" role="document">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h5 class="modal-title" id="modal-title-${settings.id}">${settings.title}</h5>
//                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">${$$ex(settings.id)}</span>
//                 </button>
//             </div>
//             <div class="modal-body">
//                 ...
//             </div>
//             <div class="modal-footer">
//                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
//                 <button type="button" class="btn btn-danger">Delete</button>
//             </div>
//         </div>
//     </div>
//     </div>
// }




























