import bcrypt from "bcryptjs";
import { UsuarioModel, Usuario } from "../entidades/usuario";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// https://stackoverflow.com/questions/65772869/how-do-i-type-hint-the-user-argument-when-calling-passport-serializeuser-in-type
declare namespace Express {
    interface User {
        id?: string;
    }
}

// serializers responsáveis por guardar a sessão do usuário no express
passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    UsuarioModel.findById(id, (err: any, user: boolean | Express.User | null | undefined) => {
        done(err, user);
    });
});

// registrar usuario
passport.use(
    "local-register",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "senha",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                // para checar se o usuário com este email já existe, procuramos por ele no banco de dados
                const usuario = await UsuarioModel.findOne({ email }).exec();

                if (usuario) {
                    // usuario já existe, retorne um erro
                    return done(null, false, { message: "Email já cadastrado." });
                }

                // passar a senha por um hash antes de guardar no banco de dados
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);

                // criar novo usuario
                const novoUsuario = new UsuarioModel({
                    nome: req.body.nome,
                    email,
                    senha: hash,
                });

                try {
                    const usuarioSalvo = await novoUsuario.save();
                    return done(null, usuarioSalvo);
                } catch (err) {
                    return done(err, false);
                }
            } catch (err) {
                done(err, false);
            }
        }
    )
);

// login do usuario
passport.use(
    "local-login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "senha",
        },
        async (email, password, done) => {
            try {
                // primeiro procuramos o usuário no banco de dados
                const usuario = await UsuarioModel.findOne({ email }).exec();

                if (!usuario) {
                    // usuario não existe, retorne um erro
                    return done(null, false, { message: "Email ou senha incorretos" });
                }

                // comparar os hashs das senhas
                const match = await bcrypt.compare(password, usuario.senha);

                if (match) {
                    return done(null, usuario);
                } else {
                    // senha incorreta
                    return done(null, false, { message: "Email ou senha incorretos." });
                }
            } catch (err) {
                done(err, false);
            }
        }
    )
);

export default passport;
