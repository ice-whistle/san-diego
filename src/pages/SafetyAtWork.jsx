import './Pages.css';
import { Typography, Divider, Button } from '@mui/material';
import {
    SafetyForEmployeesPDFEN,
    SafetyForEmployeesPDFES,
    SafetyForEmployersPDFEN,
    SafetyForEmployersPDFES
} from '../assets/documents'

export const SafetyAtWork = ({language, setFocusedCenter, setFocusedZoom, setFocusedAlertId}) =>{
    setFocusedCenter(null);
    setFocusedZoom(null);
    setFocusedAlertId(null);

    const BulletList = ({listData}) => {
    return (
        <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2 }}>
            {listData.map((item, index) => (
                <li key={index}>
                    {item.text}
                    {item.subText && (
                        <ul>
                        {item.subText.map((sub, index) => (
                            <li key={index}>{sub}</li>
                        ))}
                        </ul>
                    )}
                </li>
            ))}
        </Typography>
    );
    }

    const details = {
        partOne: {
            titleEN: 'Employees',
            titleES: 'Empleados',
            subtitleEN: 'Before ICE visits',
            subtitleES: 'Antes de las visitas de ICE',
            textEN: [
                {text: 'Learn your rights and contact trusted immigration attorneys or organizations'},
                {text: 'Protect your privacy by sharing your immigration status only when legally required, including for Form I-9. You choose which acceptable I-9 documents to present; your employer generally cannot require a specific document or immigration status'},
                {text: 'Do not share your immigration status unnecessarily to protect your privacy'},
                {text: 'Keep contact information for a trusted immigration lawyer or legal organization'},
                {text: 'Give your employer contact information to a friend or relative and permission to give paychecks and other compensation to that person in case your employer cannot contact you'},
            ],
            textES: [
                {text: 'Infórmese sobre sus derechos y contacte a abogados de inmigración u organizaciones de confianza'},
                {text: 'Proteja su privacidad compartiendo su estatus migratorio solo cuando sea legalmente obligatorio, como para el Formulario I-9. Usted elige qué documentos aceptables para el I-9 presentar; por lo general, su empleador no puede exigir un documento o estatus migratorio específico'},
                {text: 'No comparta su estatus migratorio innecesariamente para proteger su privacidad'},
                {text: 'Conserve la información de contacto de un abogado de inmigración u organización legal de confianza'},
                {text: 'Proporcione la información de contacto de su empleador a un amigo o familiar, y dé permiso para que se entreguen los cheques de pago y otras remuneraciones a esa persona en caso de que su empleador no pueda comunicarse con usted'},
            ],
        },
        partTwo: {
            subtitleEN: 'When ICE visits',
            subtitleES: 'Cuando el ICE realiza una visita',
            textEN: [
                    {text: 'Stay calm; do not run, physically resist, or interfere with officers'},
                    {text: 'Immediately contact the designated supervisor'},
                    {text: 'You have the right to remain silent. If ICE approaches you, you may say: “I do not want to answer questions. Please speak with my supervisor or attorney”'},
                    {text: 'Do not consent to a search or give permission for ICE to enter private workplace areas. Immediately notify your designated supervisor. Your employer should request and review any warrant'},
                    {text: 'Do not sign any documents, provide false documents or consent to searches without consulting a lawyer'},
                    {text: 'If it is safe and lawful to do so, you may observe and document the event, including officers\' names, badge numbers, and actions. Do not physically interfere with officers or obstruct their work'},
                    {text: 'You have the right to report workplace violations (wage theft, unsafe conditions, discrimination) without fear of deportation or immigration-based retaliation'},
                    {text: 'Contact a trusted community organization or immigration attorney immediately'}
            ],
            textES: [
                {text: 'Mantenga la calma; no corra, no se resista físicamente ni interfiera con los agentes'},
                {text: 'Comuníquese de inmediato con el supervisor designado'},
                {text: 'Tiene derecho a guardar silencio. Si agentes de ICE se le acercan, puede decir: “No quiero responder preguntas. Por favor, hable con mi supervisor o abogado”'},
                {text: 'No consienta un registro ni dé permiso a ICE para entrar en áreas privadas del lugar de trabajo. Notifique inmediatamente a su supervisor designado. Su empleador debe solicitar y revisar cualquier orden judicial'},
                {text: 'No firme documentos, no entregue documentos falsos ni consienta registros sin consultar a un abogado'},
                {text: 'Si es seguro y legal hacerlo, puede observar y documentar el suceso, incluyendo los nombres de los agentes, sus números de placa y sus acciones. No interfiera físicamente con los agentes ni obstruya su trabajo'},
                {text: 'Tiene derecho a denunciar infracciones laborales (robo de salarios, condiciones inseguras, discriminación) sin temor a la deportación o a represalias por motivos migratorios'},
                {text: 'Comuníquese de inmediato con una organización comunitaria de confianza o con un abogado de inmigración'}
            ],
        },
        partThree: {
            subtitleEN: 'After ICE visits',
            subtitleES: 'Después de las visitas de ICE',
            textEN: [
                    {text: 'You have the right to seek immediate legal help if you or others were detained'},
                    {text: 'Contact trusted community organizations or immigration attorneys promptly'},
                    {text: 'You have the right to file complaints with labor agencies if workplace rights were violated'},
                    {text: 'You have the right to continue documenting any workplace changes such as termination, reduced hours, or harassment'},
                    {text: 'Apply for unemployment benefits if you lose your job through no fault of your own'},
            ],
            textES: [
                {text: 'Tiene derecho a buscar asistencia legal inmediata si usted u otras personas fueron detenidas'},
                {text: 'Comuníquese sin demora con organizaciones comunitarias de confianza o con abogados de inmigración'},
                {text: 'Tiene derecho a presentar quejas ante las autoridades laborales si se han vulnerado sus derechos en el trabajo'},
                {text: 'Tiene derecho a seguir documentando cualquier cambio en el empleo, como el despido, la reducción de horas o el acoso'},
                {text: 'Solicite beneficios por desempleo si pierde su trabajo por causas ajenas a su voluntad'},
            ]
        },
        partFour: {
            subtitleEN: 'Resources',
            subtitleES: 'Recursos',
            textEN: [
                {text: 'Immigration Legal Service Coalition of San Diego: (858) 751-7553', subText: [
                    'Rapid response legal support for community members detained by immigration enforcement agents'
                ]},
                {text: 'San Diego County Immigrant Legal Defense Program: (619) 446-2883', subText: [
                    'Connects people in deportation proceedings to a free attorney. Available for people who are detained or in "alternative to detention" status in San Diego County or have ties to San Diego County. Number for people detained at Otay Mesa Detention Center: 1157# (free to dial)'
                ]},
                {text: 'San Diego Immigrant Rights Consortium/Alliance San Diego: (619) 269-1823', subText: [
                    'Provides services including education on different forms of relief, one-on-one consultations, deportation defense, and application assistance'
                ]},
            ],
            textES: [
                {text: 'Immigration Legal Service Coalition of San Diego: (858) 751-7553', subText: [
                    'Apoyo legal de respuesta rápida para miembros de la comunidad detenidos por agentes de inmigración'
                ]},
                {text: 'San Diego County Immigrant Legal Defense Program: (619) 446-2883', subText: [
                    'Conecta a personas en procesos de deportación con un abogado gratuito. Disponible para personas detenidas o bajo un estatus de "alternativa a la detención" en el condado de San Diego, o que tengan vínculos con dicho condado. Número para personas detenidas en el Centro de Detención de Otay Mesa: 1157# (llamada gratuita)'
                ]},
                {text: 'San Diego Immigrant Rights Consortium/Alliance San Diego: (619) 269-1823', subText: [
                    'Ofrece servicios que incluyen educación sobre diversas formas de alivio migratorio, consultas individuales, defensa contra la deportación y asistencia para completar solicitudes'
                ]},
            ],
        },
        partFive: {
            titleEN: 'Employers',
            titleES: 'Employers',
            subtitleEN: 'Before ICE visits',
            subtitleES: 'Antes de las visitas de ICE',
            textEN: [
                {text: 'Understand and comply with Assembly Bill 450 (Immigrant Worker Protection Act): do not allow ICE agents into non-public areas without a valid judicial warrant'},
                {text: 'Ensure employees are notified within 72 hours of receiving Notice of any I-9 inspections'},
                {text: 'Maintain strict confidentiality regarding workers\' immigration status and documentation'},
                {text: 'Train HR, managers, and supervisors on immigrant worker rights and anti-discrimination laws relevant to ICE'},
                {text: 'Develop and communicate a clear workplace policy regarding ICE visits, including who is authorized to respond'},
                {text: 'Maintain updated contact information for legal counsel experienced in immigration and labor law'},
                {text: 'Partner with trusted community organizations to provide resources and support for immigrant employees'}
            ],
            textES: [
                {text: 'Comprender y cumplir con el Proyecto de Ley de la Asamblea 450 (Ley de Protección de Trabajadores Inmigrantes): no permitir el acceso de agentes del ICE a áreas no públicas sin una orden judicial válida'},
                {text: 'Asegurarse de notificar a los empleados dentro de las 72 horas posteriores a la recepción de una notificación sobre cualquier inspección del formulario I-9'},
                {text: 'Mantener una estricta confidencialidad respecto al estatus migratorio y la documentación de los trabajadores'},
                {text: 'Capacitar al personal de Recursos Humanos, gerentes y supervisores sobre los derechos de los trabajadores inmigrantes y las leyes contra la discriminación relevantes para el ICE'},
                {text: 'Elaborar y comunicar una política interna clara sobre las visitas del ICE, incluyendo quién está autorizado para responder'},
                {text: 'Mantener actualizada la información de contacto de asesores legales con experiencia en leyes de inmigración y laborales'},
                {text: 'Colaborar con organizaciones comunitarias de confianza para brindar recursos y apoyo a los empleados inmigrantes'}
            ],
        },
        partSix: {
            subtitleEN: 'When ICE visits',
            subtitleES: 'Cuando el ICE realiza una visita',
            textEN: [
                {text: 'Ask ICE agents to show a valid judicial warrant signed by a judge before allowing entry to private areas'},
                {text: 'Do not provide ICE agents with employee records or allow inspections without proper legal authorization'},
                {text: 'Refrain from any action that could be seen as discrimination, retaliation, or intimidation based on immigration status'},
                {text: 'Protect employees\' rights to remain silent and their right to legal representation during ICE interactions'},
                {text: 'Designate at least one staff member to accompany each agent during the search'},
                {text: 'Designate a staff member to observe and document the event, including agents\' names, badge numbers, and actions'},
                {text: 'Do not physically interfere with any law enforcement officer, but ensure that all actions by ICE comply with legal requirements'},
                {text: 'Avoid sharing any immigration status information with ICE without proper authorization'}
            ],
            textES: [
                {text: 'Solicite a los agentes de ICE que muestren una orden judicial válida firmada por un juez antes de permitirles el acceso a áreas privadas'},
                {text: 'No entregue registros de empleados a los agentes de ICE ni permita inspecciones sin la debida autorización legal'},
                {text: 'Absténgase de realizar cualquier acción que pueda interpretarse como discriminación, represalia o intimidación por motivos de estatus migratorio'},
                {text: 'Proteja el derecho de los empleados a guardar silencio y a contar con representación legal durante las interacciones con ICE'},
                {text: 'Designe al menos a un miembro del personal para que acompañe a cada agente durante la inspección'},
                {text: 'Designe a un miembro del personal para observar y documentar el evento, incluyendo los nombres de los agentes, sus números de placa y sus acciones'},
                {text: 'No interfiera físicamente con ningún agente del orden público, pero asegúrese de que todas las acciones de ICE cumplan con los requisitos legales'},
                {text: 'Evite compartir información sobre el estatus migratorio con ICE sin la debida autorización'}
            ],
        },
        partSeven: {
            subtitleEN: 'If an employee is detained',
            subtitleES: 'Si un empleado es detenido',
            textEN: [
                {text: 'Document the detention. Record the employee\'s name, the date and time of detention, the agency involved, and, if available, the name and contact information of the supervising agent. Note whether the employee was removed from the workplace or detained on-site'},
                {text: 'Ensure that the employee is paid all wages owed for work performed up to the time of detention'},
                {text: 'Designate someone to serve as a point of contact for the employee\'s family or emergency contacts, consistent with company policy and privacy laws. This should be someone in HR or management who has received some training on these issues'},
                {text: 'Address benefits and job-status issues carefully. Detention does not automatically constitute a voluntary resignation or “job abandonment”'},
            ],
            textES: [
                {text: 'Documente la detención. Registre el nombre del empleado, la fecha y hora de la detención, la agencia involucrada y, si está disponible, el nombre y la información de contacto del agente supervisor. Indique si el empleado fue retirado del lugar de trabajo o detenido en las instalaciones'},
                {text: 'Asegúrese de que se paguen al empleado todos los salarios adeudados por el trabajo realizado hasta el momento de la detención'},
                {text: 'Designe a una persona para que actúe como punto de contacto para la familia del empleado o sus contactos de emergencia, de conformidad con la política de la empresa y las leyes de privacidad. Esta persona debe pertenecer a Recursos Humanos o a la dirección y haber recibido capacitación sobre estos temas'},
                {text: 'Aborde con cuidado las cuestiones relativas a los beneficios y al estatus laboral. La detención no constituye automáticamente una renuncia voluntaria ni un "abandono del puesto de trabajo"'},
            ],
        },
        partEight: {
            subtitleEN: 'After ICE visits',
            subtitleES: 'Después de las visitas de ICE',
            textEN: [
                {text: 'Maintain confidentiality of any information obtained during the event'},
                {text: 'Thoroughly investigate any reports of retaliation, discrimination, or workplace disruption linked to the ICE visit'},
                {text: 'Provide support and information to employees about their rights and resources'},
                {text: 'Cooperate with any lawful labor investigations if workplace violations are reported in connection with ICE activity'},
                {text: 'Review and update workplace policies and training materials regularly to ensure compliance with immigration and labor laws'},
                {text: 'Establish channels for employees to report concerns or retaliation safely and confidentially'},
                {text: 'Document all ICE-related incidents and employer responses to protect against legal risks'}
            ],
            textES: [
                {text: 'Mantener la confidencialidad de cualquier información obtenida durante el evento'},
                {text: 'Investigar exhaustivamente cualquier denuncia de represalias, discriminación o alteración del entorno laboral relacionada con la visita del ICE'},
                {text: 'Brindar apoyo e información a los empleados sobre sus derechos y los recursos disponibles'},
                {text: 'Colaborar con cualquier investigación laboral legítima si se denuncian infracciones laborales en relación con la actividad del ICE'},
                {text: 'Revisar y actualizar periódicamente las políticas internas y los materiales de capacitación para garantizar el cumplimiento de las leyes de inmigración y laborales'},
                {text: 'Establecer canales para que los empleados puedan comunicar sus inquietudes o denunciar represalias de manera segura y confidencial'},
                {text: 'Documentar todos los incidentes relacionados con el ICE y las respuestas del empleador para protegerse frente a riesgos legales'}
            ],
        },
    }
    
  return (
    <div className='pageContainer'>
        <Typography variant='h4'>{language === 'EN' ? 'Safety at work' : 'Seguridad en el trabajo'}</Typography>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partOne.titleEN : details.partOne.titleES}</Typography>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partOne.subtitleEN : details.partOne.subtitleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partOne.textEN}/> : <BulletList listData={details.partOne.textES}/>}
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partTwo.subtitleEN : details.partTwo.subtitleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partTwo.textEN}/> : <BulletList listData={details.partTwo.textES}/>}
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partThree.subtitleEN : details.partThree.subtitleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partThree.textEN}/> : <BulletList listData={details.partThree.textES}/>}
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partFour.subtitleEN : details.partFour.subtitleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partFour.textEN}/> : <BulletList listData={details.partFour.textES}/>}
        <Button href={language === 'EN' ? SafetyForEmployeesPDFEN : SafetyForEmployeesPDFES} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? 'Employee safety (PDF)' : 'Seguridad de los empleados (PDF)'}</Button>
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partFive.titleEN : details.partFive.titleES}</Typography>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partFive.subtitleEN : details.partFive.subtitleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partFive.textEN}/> : <BulletList listData={details.partFive.textES}/>}
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partSix.subtitleEN : details.partSix.subtitleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partSix.textEN}/> : <BulletList listData={details.partSix.textES}/>}
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partSeven.subtitleEN : details.partSeven.subtitleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partSeven.textEN}/> : <BulletList listData={details.partSeven.textES}/>}
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partEight.subtitleEN : details.partEight.subtitleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partEight.textEN}/> : <BulletList listData={details.partEight.textES}/>}
        <Button href={language === 'EN' ? SafetyForEmployersPDFEN : SafetyForEmployersPDFES} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? 'Employer guidelines (PDF)' : 'Directrices para empleadores (PDF)'}</Button>
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? 'Sources' : 'Fuentes'}</Typography>
        <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2, wordBreak: 'break-word', overflowWrap: 'break-word'}}>
            <li>Hirsh, Gizie, et al. “Preparing for Immigration Enforcement: What Businesses Should Do, and Avoid, If ICE Shows Up.” The Modern Workplace, 16 Jan. 2026, https://www.themodernworkplace.com/preparing-for-immigration-enforcement-what-businesses-should-do-and-avoid-if-ice-shows-up/. Accessed 17 Sept. 2026.</li>
            <li>San Diego County. “Know Your Rights: What to Do If ICE Comes to Your Workplace.” Sandiegocounty.Gov, https://www.sandiegocounty.gov/content/sdc/OLSE/SelfHelpResources/what-to-do-if-ice-comes-to-your-workplace.html. Accessed 17 Sept. 2026.</li>
        </Typography>
    </div>
  );
}